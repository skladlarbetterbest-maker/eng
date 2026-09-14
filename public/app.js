// EngMastery AI Core Application Controller
// Manages progress, gamification, exercise engine, and AI interactions

class AppController {
  constructor() {
    this.storageKey = "engmastery_user_state_v1";
    this.state = this.loadState();
    this.currentLesson = null;
    this.currentExIndex = 0;
    this.activeTab = "roadmap";
    this.isRecording = false;

    this.init();
  }

  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("State parsing error", e);
      }
    }
    return {
      xp: 0,
      streak: 1,
      hearts: 5,
      completedUnits: [], // Yangi boshlagan foydalanuvchi uchun toza holat
      unlockedUnits: ["l1-u1"], // Faqat 1-dars ochiq, qolgani bosqichma-bosqich ochiladi
      userLevel: "A1 Starter",
      lastActiveDate: new Date().toDateString()
    };
  }

  saveState() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    this.updateHeaderStats();
  }

  init() {
    this.updateHeaderStats();
    this.bindNavigation();
    this.switchTab("roadmap"); // Har doim Darslar xaritasidan boshlanadi
    this.renderRoadmap();
    this.initAIInteractions();
    this.initShadowingStudio();
    this.initConfetti();
    this.initSettings();
  }

  updateHeaderStats() {
    document.getElementById("stat-streak-val").textContent = this.state.streak;
    document.getElementById("stat-xp-val").textContent = this.state.xp;
    document.getElementById("stat-hearts-val").textContent = this.state.hearts;
  }

  bindNavigation() {
    const navButtons = document.querySelectorAll(".nav-menu button");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        window.soundFX.playClick();
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-menu .nav-item").forEach(item => {
      item.classList.toggle("active", item.querySelector("button").dataset.tab === tabId);
    });

    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });

    if (tabId === "roadmap") {
      this.renderRoadmap();
    }
  }

  // ==========================================
  // ROADMAP RENDERER (Duolingo Tree)
  // ==========================================
  renderRoadmap() {
    const container = document.getElementById("roadmap-tree");
    if (!container) return;
    container.innerHTML = "";

    window.ROADMAP_DATA.forEach((levelData, lvlIdx) => {
      const levelEl = document.createElement("div");
      levelEl.className = "level-section";
      levelEl.style.setProperty("--level-color", levelData.color);

      let unitsHtml = "";
      levelData.units.forEach((unit, uIdx) => {
        const isCompleted = this.state.completedUnits.includes(unit.id);
        const isUnlocked = this.state.unlockedUnits.includes(unit.id);

        let statusClass = "locked";
        let statusBadge = `<span class="unit-badge status-locked">🔒 Qulflangan</span>`;
        let btnText = "Boshlash";
        let btnDisabled = "disabled";

        if (isCompleted) {
          statusClass = "completed";
          statusBadge = `<span class="unit-badge status-completed">✓ Bajarilgan (+50 XP)</span>`;
          btnText = "Qayta takrorlash 🔄";
          btnDisabled = "";
        } else if (isUnlocked) {
          statusClass = "available";
          statusBadge = `<span class="unit-badge status-available">⚡ Yangi Dars (Ochiq)</span>`;
          btnText = "Darsni boshlash ➔";
          btnDisabled = "";
        }

        unitsHtml += `
          <div class="unit-card ${statusClass}">
            <div>
              <div class="unit-card-header">
                <span class="unit-number">${levelData.level} • ${unit.subtitle}</span>
                ${statusBadge}
              </div>
              <h4 class="unit-title">${unit.title}</h4>
              <div class="grammar-preview">
                <strong>Grammatika:</strong> ${unit.grammarTip.title}
              </div>
            </div>
            <div class="unit-footer">
              <button class="btn-duo btn-duo-green" ${btnDisabled} onclick="app.startLesson('${levelData.id}', '${unit.id}')">
                ${btnText}
              </button>
            </div>
          </div>
        `;
      });

      levelEl.innerHTML = `
        <div class="level-header">
          <div class="level-title-wrap">
            <span class="level-badge">${levelData.level}</span>
            <div>
              <h3>${levelData.icon} ${levelData.title}</h3>
              <p class="level-desc">${levelData.description}</p>
            </div>
          </div>
        </div>
        <div class="units-grid">
          ${unitsHtml}
        </div>
      `;

      container.appendChild(levelEl);
    });
  }

  // ==========================================
  // LESSON PRACTICE ENGINE
  // ==========================================
  startLesson(levelId, unitId) {
    window.soundFX.playClick();
    const level = window.ROADMAP_DATA.find(l => l.id === levelId);
    if (!level) return;
    const unit = level.units.find(u => u.id === unitId);
    if (!unit) return;

    this.currentLesson = unit;
    this.currentExIndex = 0;
    this.openLessonModal();
    this.renderExercise();
  }

  openLessonModal() {
    const modal = document.getElementById("lesson-modal");
    modal.classList.add("active");
  }

  closeLessonModal() {
    window.soundFX.playClick();
    const modal = document.getElementById("lesson-modal");
    modal.classList.remove("active");
    if (this.recognition) this.recognition.stop();
  }

  renderExercise() {
    const unit = this.currentLesson;
    const total = unit.exercises.length;
    const current = this.currentExIndex;
    const ex = unit.exercises[current];

    // Progress Bar
    const pct = Math.round((current / total) * 100);
    document.getElementById("lesson-progress-bar").style.width = `${pct}%`;

    const body = document.getElementById("lesson-body");
    const footer = document.getElementById("lesson-footer");
    footer.innerHTML = `
      <div id="feedback-zone"></div>
      <button id="btn-check-ex" class="btn-duo btn-duo-green">Tekshirish</button>
    `;

    if (ex.type === "vocab" || ex.type === "listening") {
      this.renderChoiceExercise(ex, body);
    } else if (ex.type === "sentence_builder") {
      this.renderSentenceBuilder(ex, body);
    } else if (ex.type === "speaking") {
      this.renderSpeakingExercise(ex, body);
    }
  }

  renderChoiceExercise(ex, body) {
    let promptHtml = "";
    if (ex.type === "listening") {
      promptHtml = `
        <div class="prompt-card">
          <span class="prompt-text">🎧 Audioni eshiting</span>
          <button class="btn-listen-prompt" onclick="app.speakText('${ex.speech}')">🔊</button>
        </div>
      `;
      // Auto play once
      setTimeout(() => this.speakText(ex.speech), 300);
    } else if (ex.word) {
      promptHtml = `
        <div class="prompt-card">
          <span class="prompt-text">${ex.word}</span>
          <button class="btn-listen-prompt" onclick="app.speakText('${ex.speech || ex.word}')">🔊</button>
        </div>
      `;
    }

    let optionsHtml = "";
    ex.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="option-btn" data-index="${idx}" onclick="app.selectOption(this, ${idx})">
          <span>${opt}</span>
        </button>
      `;
    });

    body.innerHTML = `
      <div class="exercise-container">
        <h3 class="exercise-question">${ex.question}</h3>
        ${promptHtml}
        <div class="options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;

    this.selectedOptionIndex = null;
    document.getElementById("btn-check-ex").onclick = () => this.checkChoiceAnswer(ex);
  }

  selectOption(el, idx) {
    window.soundFX.playClick();
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    el.classList.add("selected");
    this.selectedOptionIndex = idx;
  }

  checkChoiceAnswer(ex) {
    if (this.selectedOptionIndex === null) {
      alert("Iltimos, avval javob variantlaridan birini tanlang!");
      return;
    }

    const isCorrect = this.selectedOptionIndex === ex.answer;
    const selectedBtn = document.querySelectorAll(".option-btn")[this.selectedOptionIndex];

    if (isCorrect) {
      window.soundFX.playCorrect();
      selectedBtn.classList.add("correct");
      this.showFeedback(true, "Ajoyib! To'g'ri javob!");
    } else {
      window.soundFX.playWrong();
      selectedBtn.classList.add("wrong");
      document.querySelectorAll(".option-btn")[ex.answer].classList.add("correct");
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      this.saveState();
      this.showFeedback(false, `Noto'g'ri. To'g'ri javob: ${ex.options[ex.answer]}`);
    }
  }

  // ==========================================
  // SENTENCE BUILDER EXERCISE
  // ==========================================
  renderSentenceBuilder(ex, body) {
    this.assembledWords = [];
    body.innerHTML = `
      <div class="exercise-container">
        <h3 class="exercise-question">${ex.question}</h3>
        <div id="sentence-dropzone" class="sentence-dropzone"></div>
        <div id="word-bank" class="word-bank"></div>
      </div>
    `;

    const dropzone = document.getElementById("sentence-dropzone");
    const bank = document.getElementById("word-bank");

    // Shuffle words
    const shuffled = [...ex.words].sort(() => Math.random() - 0.5);

    shuffled.forEach((word, idx) => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.textContent = word;
      chip.dataset.word = word;
      chip.dataset.chipId = `chip-${idx}`;

      chip.onclick = () => {
        window.soundFX.playClick();
        if (!chip.classList.contains("used")) {
          // Add to dropzone
          chip.classList.add("used");
          const assembledChip = document.createElement("div");
          assembledChip.className = "word-chip";
          assembledChip.textContent = word;
          assembledChip.dataset.sourceChip = `chip-${idx}`;
          assembledChip.onclick = () => {
            window.soundFX.playClick();
            chip.classList.remove("used");
            assembledChip.remove();
            this.assembledWords = this.assembledWords.filter(w => w !== word);
          };
          dropzone.appendChild(assembledChip);
          this.assembledWords.push(word);
        }
      };

      bank.appendChild(chip);
    });

    document.getElementById("btn-check-ex").onclick = () => this.checkSentenceAnswer(ex);
  }

  checkSentenceAnswer(ex) {
    const isCorrect = JSON.stringify(this.assembledWords) === JSON.stringify(ex.correctOrder);
    if (isCorrect) {
      window.soundFX.playCorrect();
      this.showFeedback(true, "Zo'r! Jumla to'g'ri tuzildi!");
    } else {
      window.soundFX.playWrong();
      this.showFeedback(false, `Noto'g'ri tartib. To'g'ri versiya: "${ex.correctOrder.join(' ')}"`);
    }
  }

  // ==========================================
  // SPEAKING EXERCISE WITH RECOGNITION
  // ==========================================
  renderSpeakingExercise(ex, body) {
    body.innerHTML = `
      <div class="exercise-container">
        <h3 class="exercise-question">${ex.question}</h3>
        <div class="prompt-card" style="flex-direction: column; align-items: flex-start;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <span class="prompt-text" style="font-size: 1.25rem;">"${ex.targetText}"</span>
            <button class="btn-listen-prompt" onclick="app.speakText('${ex.targetText.replace(/'/g, "\\'")}')">🔊</button>
          </div>
          <small style="color: var(--duo-blue); margin-top: 8px;">💡 Maslahat: ${ex.hint}</small>
        </div>

        <div class="speaking-box">
          <button id="modal-mic-btn" class="mic-btn-large" onclick="app.toggleLessonMic('${ex.targetText.replace(/'/g, "\\'")}')">
            🎙️
          </button>
          <p id="mic-status-hint" style="font-weight: 600; color: var(--text-secondary);">Mikrofonni bosing va gapiring</p>
          <div id="speech-transcript" class="speech-transcript-box">Ovozingiz shu yerda yoziladi...</div>
        </div>
      </div>
    `;

    document.getElementById("btn-check-ex").onclick = () => this.checkSpeakingAnswer(ex);
  }

  toggleLessonMic(targetText) {
    const btn = document.getElementById("modal-mic-btn");
    const transcriptBox = document.getElementById("speech-transcript");
    const hint = document.getElementById("mic-status-hint");

    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      alert("Kechirasiz, brauzeringizda Speech Recognition (Ovozni tanish) qo'llab-quvvatlanmaydi. Chrome yoki Edge brauzeridan foydalaning.");
      return;
    }

    if (this.isRecording) {
      if (this.recognition) this.recognition.stop();
      this.isRecording = false;
      btn.classList.remove("recording");
      window.soundFX.playMicToggle(false);
      hint.textContent = "Mikrofon to'xtatildi. 'Tekshirish' tugmasini bosing.";
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.isRecording = true;
      btn.classList.add("recording");
      window.soundFX.playMicToggle(true);
      hint.textContent = "Tinglanmoqda... Gapiring!";
      transcriptBox.textContent = "";
    };

    this.recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      transcriptBox.textContent = transcript;
      this.latestTranscript = transcript;
    };

    this.recognition.onerror = (e) => {
      console.error("Speech error", e);
      this.isRecording = false;
      btn.classList.remove("recording");
      hint.textContent = "Xatolik yuz berdi yoki mikrofon ruxsati berilmadi.";
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      btn.classList.remove("recording");
      hint.textContent = "Yozib olindi! Endi 'Tekshirish' tugmasini bosing.";
    };

    this.recognition.start();
  }

  checkSpeakingAnswer(ex) {
    const spoken = (this.latestTranscript || "").trim().toLowerCase();
    const target = ex.targetText.trim().toLowerCase().replace(/[.,!?'"]/g, "");
    const spokenClean = spoken.replace(/[.,!?'"]/g, "");

    if (!spokenClean) {
      alert("Iltimos, avval mikrofonga gapirib ko'ring!");
      return;
    }

    // Calculate word overlap similarity
    const targetWords = target.split(/\s+/);
    const spokenWords = spokenClean.split(/\s+/);
    let matched = 0;
    targetWords.forEach(w => {
      if (spokenWords.includes(w)) matched++;
    });

    const accuracy = Math.round((matched / targetWords.length) * 100);

    if (accuracy >= 65) {
      window.soundFX.playCorrect();
      this.showFeedback(true, `Ajoyib talaffuz! Moslik: ${accuracy}%`);
    } else {
      window.soundFX.playWrong();
      this.showFeedback(false, `Talaffuz mosligi: ${accuracy}%. Qaytadan urinib ko'ring!`);
    }
  }

  showFeedback(isSuccess, message) {
    const feedbackZone = document.getElementById("feedback-zone");
    const checkBtn = document.getElementById("btn-check-ex");

    feedbackZone.innerHTML = `
      <div class="feedback-banner ${isSuccess ? 'correct' : 'wrong'}">
        <span>${isSuccess ? '🎉' : '⚠️'}</span>
        <span>${message}</span>
      </div>
    `;

    checkBtn.textContent = "Davom etish ➔";
    checkBtn.className = `btn-duo ${isSuccess ? 'btn-duo-green' : 'btn-duo-blue'}`;
    checkBtn.onclick = () => this.nextExercise();
  }

  nextExercise() {
    window.soundFX.playClick();
    this.currentExIndex++;
    if (this.currentExIndex < this.currentLesson.exercises.length) {
      this.renderExercise();
    } else {
      this.completeLesson();
    }
  }

  completeLesson() {
    window.soundFX.playLevelUp();
    this.triggerConfetti();

    // Reward XP
    this.state.xp += 50;
    if (!this.state.completedUnits.includes(this.currentLesson.id)) {
      this.state.completedUnits.push(this.currentLesson.id);
    }

    // Unlock next unit in sequence
    let allUnitIds = [];
    window.ROADMAP_DATA.forEach(lvl => {
      lvl.units.forEach(u => allUnitIds.push(u.id));
    });
    const currIdx = allUnitIds.indexOf(this.currentLesson.id);
    if (currIdx !== -1 && currIdx + 1 < allUnitIds.length) {
      const nextUnitId = allUnitIds[currIdx + 1];
      if (!this.state.unlockedUnits.includes(nextUnitId)) {
        this.state.unlockedUnits.push(nextUnitId);
      }
    }

    this.saveState();

    const body = document.getElementById("lesson-body");
    const footer = document.getElementById("lesson-footer");

    body.innerHTML = `
      <div style="text-align: center; padding: 2rem 0;">
        <div style="font-size: 4.5rem; margin-bottom: 1rem;">🏆</div>
        <h2 style="font-family: var(--font-heading); font-size: 2rem; color: var(--duo-green); margin-bottom: 8px;">
          Dars Muvaffaqiyatli Yakunlandi!
        </h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1.5rem;">
          Siz yangi bilim va gapirish ko'nikmasiga ega bo'ldingiz.
        </p>
        <div style="display: inline-flex; gap: 20px; background: rgba(255, 255, 255, 0.05); padding: 14px 28px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--duo-yellow);">+50</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">XP QO'SHILDI</div>
          </div>
          <div style="border-left: 1px solid var(--border-color); padding-left: 20px;">
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--duo-green);">100%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">ANIQLIK</div>
          </div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="btn-duo btn-duo-green" onclick="app.closeLessonModal()">
        Yo'l xaritasiga qaytish ➔
      </button>
    `;

    this.renderRoadmap();
  }

  speakText(text) {
    window.groqTutor.speakText(text);
  }

  // ==========================================
  // GROQ AI SPEAKING PARTNER CHAT
  // ==========================================
  initAIInteractions() {
    const input = document.getElementById("ai-chat-input");
    const sendBtn = document.getElementById("ai-send-btn");
    const micBtn = document.getElementById("ai-mic-btn");

    if (sendBtn && input) {
      sendBtn.addEventListener("click", () => this.sendAIMessage());
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.sendAIMessage();
      });
    }

    if (micBtn) {
      micBtn.addEventListener("click", () => this.toggleAIMic());
    }

    // Mode buttons
    document.querySelectorAll(".mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.soundFX.playClick();
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        this.switchAIMode(mode);
      });
    });

    // Handle AI speech speaking animation
    window.onAISpeechStatus = (isSpeaking) => {
      const avatar = document.getElementById("ai-avatar-glow");
      if (avatar) {
        avatar.classList.toggle("speaking", isSpeaking);
      }
    };

    // Initial Welcome Message
    this.switchAIMode("ielts_examiner");
  }

  switchAIMode(mode) {
    window.groqTutor.resetConversation(mode);
    const container = document.getElementById("ai-chat-messages");
    if (!container) return;
    container.innerHTML = "";

    const titles = {
      ielts_examiner: "IELTS Speaking Examiner (David)",
      job_interview: "HR Tech Interviewer",
      cafe: "London Barista (Cafe Order)",
      travel: "Immigration & Travel Concierge",
      free_chat: "Emma (English Speaking Buddy)"
    };

    const greetings = {
      ielts_examiner: "Good day! My name is David, your IELTS Speaking Examiner. Today we will conduct a full simulation to help you achieve Band 7.5+. Let's begin with Part 1: Could you please tell me about your hometown?",
      job_interview: "Hello! Thank you for taking the time to speak with me today. Could you briefly introduce yourself and tell me about a major project you worked on?",
      cafe: "Hi there! Welcome to The London Grind! What can I get started for you today?",
      travel: "Good morning. May I see your passport and could you explain the main purpose of your visit?",
      free_chat: "Hey! Awesome to meet you! What's something interesting that happened in your day today?"
    };

    document.getElementById("ai-partner-name").textContent = titles[mode] || "AI Speaking Partner";
    this.appendAIMessage("assistant", greetings[mode], "");
    window.groqTutor.speakText(greetings[mode]);
  }

  async sendAIMessage(overrideText = null) {
    const input = document.getElementById("ai-chat-input");
    const text = (overrideText || input.value).trim();
    if (!text) return;

    if (!overrideText) input.value = "";
    this.appendAIMessage("user", text);

    // Show typing status
    const typingId = this.showTypingIndicator();

    try {
      const reply = await window.groqTutor.sendMessage(text);
      this.removeTypingIndicator(typingId);

      const parsed = window.groqTutor.parseReply(reply);
      this.appendAIMessage("assistant", parsed.conversationText, parsed.feedbackText);
      window.groqTutor.speakText(parsed.conversationText);
    } catch (err) {
      this.removeTypingIndicator(typingId);
      alert(`Groq API xatosi: ${err.message}`);
    }
  }

  appendAIMessage(role, text, feedback = "") {
    const container = document.getElementById("ai-chat-messages");
    const bubble = document.createElement("div");
    bubble.className = `msg-bubble ${role}`;

    let feedbackHtml = "";
    if (feedback) {
      feedbackHtml = `
        <div class="feedback-card-inline">
          <strong>📊 IELTS Ekspert Maslahati & Tuzatish:</strong><br>
          ${feedback.replace(/\n/g, "<br>")}
        </div>
      `;
    }

    bubble.innerHTML = `
      <div>${text}</div>
      ${feedbackHtml}
    `;

    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  showTypingIndicator() {
    const container = document.getElementById("ai-chat-messages");
    const el = document.createElement("div");
    const id = `typing-${Date.now()}`;
    el.id = id;
    el.className = "msg-bubble assistant";
    el.innerHTML = `<em>Llama 3.3 70B o'ylamoqda... ⚡</em>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return id;
  }

  removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  toggleAIMic() {
    const micBtn = document.getElementById("ai-mic-btn");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozli kirishni qo'llab-quvvatlamaydi. Chrome yoki Edge brauzeridan foydalaning.");
      return;
    }

    if (this.isAIMicListening) {
      if (this.aiRecognition) this.aiRecognition.stop();
      this.isAIMicListening = false;
      micBtn.classList.remove("active");
      window.soundFX.playMicToggle(false);
      return;
    }

    this.aiRecognition = new SpeechRecognition();
    this.aiRecognition.lang = "en-US";
    this.aiRecognition.interimResults = false;

    this.aiRecognition.onstart = () => {
      this.isAIMicListening = true;
      micBtn.classList.add("active");
      window.soundFX.playMicToggle(true);
    };

    this.aiRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.sendAIMessage(transcript);
    };

    this.aiRecognition.onerror = (err) => {
      console.error("AI Mic error", err);
      this.isAIMicListening = false;
      micBtn.classList.remove("active");
    };

    this.aiRecognition.onend = () => {
      this.isAIMicListening = false;
      micBtn.classList.remove("active");
    };

    this.aiRecognition.start();
  }

  // ==========================================
  // SHADOWING STUDIO
  // ==========================================
  initShadowingStudio() {
    const container = document.getElementById("shadowing-container");
    if (!container) return;

    container.innerHTML = "";
    window.SHADOWING_DRILLS.forEach((drill, idx) => {
      const card = document.createElement("div");
      card.className = "shadowing-card";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="unit-badge status-available">${drill.level}</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${drill.phonetic}</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 8px;">${drill.title}</h3>
        <div class="shadowing-text-display">"${drill.text}"</div>
        <div class="shadowing-uzbek"><strong>Tarjimasi:</strong> ${drill.uzbek}</div>
        <p style="font-size: 0.85rem; color: #38bdf8; margin-bottom: 16px;">💡 <strong>Texnika:</strong> ${drill.tips}</p>
        
        <div class="shadowing-controls">
          <button class="btn-duo btn-duo-green" onclick="app.playShadowingAudio('${drill.text.replace(/'/g, "\\'")}', 1.0)">
            🔊 Oddiy tezlikda eshitish (1.0x)
          </button>
          <button class="btn-duo btn-duo-blue" onclick="app.playShadowingAudio('${drill.text.replace(/'/g, "\\'")}', 0.8)">
            🐢 Sekin eshitish (0.8x)
          </button>
          <button class="btn-duo btn-duo-purple" onclick="app.startShadowingSpeechCheck('${drill.text.replace(/'/g, "\\'")}')">
            🎙️ Birga takrorlab tekshirish
          </button>
        </div>
        <div id="shadowing-feedback-${idx}" style="margin-top: 12px; font-weight: 700;"></div>
      `;
      container.appendChild(card);
    });
  }

  playShadowingAudio(text, rate = 1.0) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-US";
    utt.rate = rate;
    window.speechSynthesis.speak(utt);
  }

  startShadowingSpeechCheck(targetText) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovoz tanishni qo'llab-quvvatlamaydi.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.start();
    alert("Mikrofon faollashdi! Hozir matnni baland ovozda ravon ayting...");

    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      const targetWords = targetText.toLowerCase().replace(/[.,!?'"]/g, "").split(/\s+/);
      const spokenWords = spoken.toLowerCase().replace(/[.,!?'"]/g, "").split(/\s+/);
      let matches = 0;
      targetWords.forEach(w => {
        if (spokenWords.includes(w)) matches++;
      });
      const score = Math.round((matches / targetWords.length) * 100);

      if (score >= 70) {
        window.soundFX.playCorrect();
        alert(`🎉 Shadowing Ajoyib! Moslik: ${score}%\nSiz aytgan matn: "${spoken}"`);
      } else {
        window.soundFX.playWrong();
        alert(`⚠️ Shadowing mosligi: ${score}%\nSiz aytgan: "${spoken}"\nQaytadan urinib ko'ring!`);
      }
    };
  }

  // ==========================================
  // SETTINGS & GROQ API
  // ==========================================
  initSettings() {
    const input = document.getElementById("settings-groq-key");
    if (input) {
      input.value = window.groqTutor.getApiKey();
    }
  }

  saveApiKeyFromInput() {
    const input = document.getElementById("settings-groq-key");
    if (input && input.value.trim()) {
      window.groqTutor.setApiKey(input.value.trim());
      window.soundFX.playCorrect();
      alert("✅ Groq API kaliti muvaffaqiyatli saqlandi!");
    }
  }

  resetAllProgress() {
    if (confirm("Haqiqatan ham barcha darslar natijalarini tozalab, qaytadan boshlamoqchimisiz?")) {
      localStorage.removeItem(this.storageKey);
      this.state = this.loadState();
      this.saveState();
      this.renderRoadmap();
      alert("Natijalar muvaffaqiyatli tiklandi!");
    }
  }

  // ==========================================
  // CONFETTI CELEBRATION
  // ==========================================
  initConfetti() {
    this.canvas = document.getElementById("confetti-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.canvas) return;
    const particles = [];
    const colors = ["#58cc02", "#1cb0f6", "#ff9600", "#ff4b4b", "#a855f7", "#ffd900"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        life: 100
      });
    }

    let frame = 0;
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.rotation += p.vr;
        p.life -= 1.2;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.life / 100);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      });

      frame++;
      if (frame < 90) {
        requestAnimationFrame(animate);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    animate();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new AppController();
});
