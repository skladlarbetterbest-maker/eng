// EngMastery AI Core Application Controller
// Manages progress, gamification, exercise engine, and AI interactions

class AppController {
  constructor() {
    this.storageKey = "engmastery_user_state_v2"; // upgraded version
    this.state = this.loadState();
    this.currentLesson = null;
    this.currentExIndex = 0;
    this.activeTab = "roadmap";
    this.isRecording = false;
    this.assembledChips = [];
    this.selectedOptionIndex = null;
    this.exerciseAnswered = false;

    this.init();
  }

  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.unlockedUnits)) {
          return parsed;
        }
      } catch (e) {
        console.error("State parsing error", e);
      }
    }
    return {
      userName: "Jamoliddin",
      xp: 0,
      streak: 1,
      hearts: 5,
      completedUnits: [], // Toza holat
      unlockedUnits: ["l1-u1"], // Faqat 1-dars ochiq
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
    this.switchTab("roadmap"); // Har doim darslar xaritasidan boshlanadi
    this.renderRoadmap();
    this.initAIInteractions();
    this.initShadowingStudio();
    this.initConfetti();
    this.initSettings();
  }

  updateHeaderStats() {
    const streakEl = document.getElementById("stat-streak-val");
    const xpEl = document.getElementById("stat-xp-val");
    const heartsEl = document.getElementById("stat-hearts-val");
    const modalHearts = document.getElementById("modal-hearts-val");

    if (streakEl) streakEl.textContent = this.state.streak;
    if (xpEl) xpEl.textContent = this.state.xp;
    if (heartsEl) heartsEl.textContent = this.state.hearts;
    if (modalHearts) modalHearts.textContent = this.state.hearts;
  }

  refillHearts() {
    window.soundFX.playCorrect();
    this.state.hearts = 5;
    this.saveState();
    alert("❤️ Jonlaringiz to'liq tiklandi (5/5)!");
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
      const btn = item.querySelector("button");
      item.classList.toggle("active", btn && btn.dataset.tab === tabId);
    });

    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });

    if (tabId === "roadmap") {
      this.renderRoadmap();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        let btnText = "Qulflangan";
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

    if (this.state.hearts <= 0) {
      if (confirm("❤️ Jonlaringiz tugagan! Jonlarni to'ldirib davom etasizmi?")) {
        this.refillHearts();
      } else {
        return;
      }
    }

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
    if (modal) {
      modal.classList.add("active");
      this.updateHeaderStats();
    }
  }

  closeLessonModal() {
    window.soundFX.playClick();
    const modal = document.getElementById("lesson-modal");
    if (modal) modal.classList.remove("active");
    if (this.recognition) {
      try { this.recognition.stop(); } catch(e){}
    }
  }

  renderExercise() {
    const unit = this.currentLesson;
    const total = unit.exercises.length;
    const current = this.currentExIndex;
    const ex = unit.exercises[current];
    this.exerciseAnswered = false;

    // Progress Bar
    const pct = Math.round(((current + 1) / total) * 100);
    const pBar = document.getElementById("lesson-progress-bar");
    if (pBar) pBar.style.width = `${pct}%`;

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

  // CHOICE / VOCAB / LISTENING
  renderChoiceExercise(ex, body) {
    let promptHtml = "";
    if (ex.type === "listening") {
      promptHtml = `
        <div class="prompt-card">
          <span class="prompt-text">🎧 Audioni diqqat bilan eshiting:</span>
          <button class="btn-listen-prompt" onclick="app.speakText('${ex.speech.replace(/'/g, "\\'")}')">🔊</button>
        </div>
      `;
      setTimeout(() => this.speakText(ex.speech), 400);
    } else if (ex.word) {
      promptHtml = `
        <div class="prompt-card">
          <span class="prompt-text">${ex.word}</span>
          <button class="btn-listen-prompt" onclick="app.speakText('${(ex.speech || ex.word).replace(/'/g, "\\'")}')">🔊</button>
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
    if (this.exerciseAnswered) return;
    window.soundFX.playClick();
    document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    el.classList.add("selected");
    this.selectedOptionIndex = idx;
  }

  checkChoiceAnswer(ex) {
    if (this.selectedOptionIndex === null) {
      alert("Iltimos, avval variantlardan birini tanlang!");
      return;
    }
    if (this.exerciseAnswered) return;
    this.exerciseAnswered = true;

    const isCorrect = this.selectedOptionIndex === ex.answer;
    const buttons = document.querySelectorAll(".option-btn");
    const selectedBtn = buttons[this.selectedOptionIndex];

    if (isCorrect) {
      window.soundFX.playCorrect();
      if (selectedBtn) selectedBtn.classList.add("correct");
      this.showFeedback(true, "Ajoyib! To'g'ri javob!");
    } else {
      window.soundFX.playWrong();
      if (selectedBtn) selectedBtn.classList.add("wrong");
      if (buttons[ex.answer]) buttons[ex.answer].classList.add("correct");
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      this.saveState();
      this.showFeedback(false, `Noto'g'ri. To'g'ri javob: "${ex.options[ex.answer]}"`);
    }
  }

  // SENTENCE BUILDER (BUG FIXED)
  renderSentenceBuilder(ex, body) {
    this.assembledChips = [];
    body.innerHTML = `
      <div class="exercise-container">
        <h3 class="exercise-question">${ex.question}</h3>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <small style="color: var(--text-muted);">So'zlarni ketma-ket bosing:</small>
          <button class="btn-copy" style="font-size: 0.75rem;" onclick="app.resetSentenceBuilder()">Qayta terish ↺</button>
        </div>
        <div id="sentence-dropzone" class="sentence-dropzone"></div>
        <div id="word-bank" class="word-bank"></div>
      </div>
    `;

    const dropzone = document.getElementById("sentence-dropzone");
    const bank = document.getElementById("word-bank");

    // Shuffle words with stable IDs
    const wordList = ex.words.map((word, idx) => ({ id: `chip-${idx}`, word }));
    const shuffled = [...wordList].sort(() => Math.random() - 0.5);

    shuffled.forEach((item) => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.textContent = item.word;
      chip.id = item.id;

      chip.onclick = () => {
        if (this.exerciseAnswered) return;
        window.soundFX.playClick();

        if (!chip.classList.contains("used")) {
          chip.classList.add("used");
          this.assembledChips.push(item);

          const placedChip = document.createElement("div");
          placedChip.className = "word-chip";
          placedChip.textContent = item.word;
          placedChip.dataset.sourceId = item.id;

          placedChip.onclick = () => {
            if (this.exerciseAnswered) return;
            window.soundFX.playClick();
            chip.classList.remove("used");
            placedChip.remove();
            this.assembledChips = this.assembledChips.filter(c => c.id !== item.id);
          };

          dropzone.appendChild(placedChip);
        }
      };

      bank.appendChild(chip);
    });

    document.getElementById("btn-check-ex").onclick = () => this.checkSentenceAnswer(ex);
  }

  resetSentenceBuilder() {
    if (this.exerciseAnswered) return;
    window.soundFX.playClick();
    this.assembledChips = [];
    const dropzone = document.getElementById("sentence-dropzone");
    if (dropzone) dropzone.innerHTML = "";
    document.querySelectorAll(".word-chip.used").forEach(c => c.classList.remove("used"));
  }

  checkSentenceAnswer(ex) {
    if (this.assembledChips.length === 0) {
      alert("Iltimos, avval so'zlarni jumlaga tering!");
      return;
    }
    if (this.exerciseAnswered) return;
    this.exerciseAnswered = true;

    const assembledWords = this.assembledChips.map(c => c.word);
    const isCorrect = JSON.stringify(assembledWords) === JSON.stringify(ex.correctOrder);

    if (isCorrect) {
      window.soundFX.playCorrect();
      this.showFeedback(true, "Zo'r! Jumla to'g'ri tuzildi!");
    } else {
      window.soundFX.playWrong();
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      this.saveState();
      this.showFeedback(false, `Noto'g'ri tartib. To'g'ri shakli: "${ex.correctOrder.join(' ')}"`);
    }
  }

  // SPEAKING EXERCISE (NO BOTTLENECK / FAILSAFE DESIGN)
  renderSpeakingExercise(ex, body) {
    const hasSpeechRec = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

    body.innerHTML = `
      <div class="exercise-container">
        <h3 class="exercise-question">${ex.question}</h3>
        
        <div class="prompt-card" style="flex-direction: column; align-items: flex-start;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <span class="prompt-text" style="font-size: 1.25rem;">"${ex.targetText}"</span>
            <button class="btn-listen-prompt" onclick="app.speakText('${ex.targetText.replace(/'/g, "\\'")}')">🔊</button>
          </div>
          <small style="color: var(--duo-blue); margin-top: 8px;">💡 Talaffuz maslahati: ${ex.hint}</small>
        </div>

        <div class="speaking-box">
          <div style="display: flex; gap: 14px; align-items: center; justify-content: center; flex-wrap: wrap;">
            <button id="modal-mic-btn" class="mic-btn-large" onclick="app.toggleLessonMic('${ex.targetText.replace(/'/g, "\\'")}')">
              🎙️
            </button>
          </div>
          <p id="mic-status-hint" style="font-weight: 600; color: var(--text-secondary); margin-top: 6px;">
            ${hasSpeechRec ? "Mikrofonni bosing va baland ovozda ayting" : "Mikrofon brauzeringizda bloklangan (HTTPS talab qilinadi)"}
          </p>
          <div id="speech-transcript" class="speech-transcript-box">Ovozingiz shu yerda yoziladi...</div>

          <!-- FAILSAFE BUTTONS SO USER IS NEVER STUCK -->
          <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 380px;">
            <button class="btn-duo btn-duo-secondary" style="font-size: 0.85rem; justify-content: center;" onclick="app.passSpeakingSelfPractice(true)">
              🗣️ Ovoz chiqarib aytdim (Davom etish)
            </button>
            <button class="btn-duo btn-duo-secondary" style="font-size: 0.8rem; justify-content: center; opacity: 0.8;" onclick="app.showTypeInputFallback('${ex.targetText.replace(/'/g, "\\'")}')">
              ⌨️ Yozib tekshirish
            </button>
          </div>
          <div id="type-fallback-zone" style="width: 100%; display: none; margin-top: 10px;">
            <input type="text" id="type-speaking-input" class="chat-input-field" placeholder="Ushbu gapni yozing...">
            <button class="btn-duo btn-duo-green" style="margin-top: 6px; width: 100%; justify-content: center;" onclick="app.checkTypedSpeaking('${ex.targetText.replace(/'/g, "\\'")}')">
              Yozilganini tekshirish
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btn-check-ex").onclick = () => this.checkSpeakingAnswer(ex);
  }

  showTypeInputFallback(targetText) {
    const zone = document.getElementById("type-fallback-zone");
    if (zone) zone.style.display = zone.style.display === "none" ? "block" : "none";
  }

  checkTypedSpeaking(targetText) {
    const input = document.getElementById("type-speaking-input");
    if (!input || !input.value.trim()) return;
    this.latestTranscript = input.value.trim();
    this.checkSpeakingAnswer({ targetText });
  }

  passSpeakingSelfPractice(success) {
    if (this.exerciseAnswered) return;
    this.exerciseAnswered = true;
    window.soundFX.playCorrect();
    this.showFeedback(true, "Barakalla! O'z ustingizda ishlaganingiz uchun +50 XP!");
  }

  toggleLessonMic(targetText) {
    const btn = document.getElementById("modal-mic-btn");
    const transcriptBox = document.getElementById("speech-transcript");
    const hint = document.getElementById("mic-status-hint");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      hint.innerHTML = `<span style="color: #ff9600;">⚠️ Brauzeringizda mikrofon faqat HTTPS da ishlaydi. Quyidagi "Ovoz chiqarib aytdim" tugmasini bosing!</span>`;
      return;
    }

    if (this.isRecording) {
      if (this.recognition) {
        try { this.recognition.stop(); } catch(e){}
      }
      this.isRecording = false;
      if (btn) btn.classList.remove("recording");
      window.soundFX.playMicToggle(false);
      hint.textContent = "To'xtatildi. Endi 'Tekshirish' tugmasini bosing.";
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "en-US";
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.isRecording = true;
        if (btn) btn.classList.add("recording");
        window.soundFX.playMicToggle(true);
        hint.textContent = "Tinglanmoqda... Gapiring!";
        if (transcriptBox) transcriptBox.textContent = "";
      };

      this.recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcriptBox) transcriptBox.textContent = transcript;
        this.latestTranscript = transcript;
      };

      this.recognition.onerror = (e) => {
        console.error("Speech error", e);
        this.isRecording = false;
        if (btn) btn.classList.remove("recording");
        hint.innerHTML = `<span style="color: #f87171;">Ovoz eshitilmadi. Pastdagi "Ovoz chiqarib aytdim" tugmasini bosishingiz mumkin.</span>`;
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        if (btn) btn.classList.remove("recording");
        hint.textContent = "Yozib olindi! 'Tekshirish' tugmasini bosing.";
      };

      this.recognition.start();
    } catch (err) {
      console.error(err);
      hint.textContent = "Mikrofonni yoqib bo'lmadi. Quyidagi tugmani bosing.";
    }
  }

  checkSpeakingAnswer(ex) {
    if (this.exerciseAnswered) return;
    const spoken = (this.latestTranscript || "").trim().toLowerCase();
    const target = ex.targetText.trim().toLowerCase().replace(/[.,!?'"]/g, "");
    const spokenClean = spoken.replace(/[.,!?'"]/g, "");

    if (!spokenClean) {
      alert("Iltimos, avval mikrofonga gapiring yoki 'Ovoz chiqarib aytdim' tugmasini bosing!");
      return;
    }
    this.exerciseAnswered = true;

    const targetWords = target.split(/\s+/);
    const spokenWords = spokenClean.split(/\s+/);
    let matched = 0;
    targetWords.forEach(w => {
      if (spokenWords.includes(w)) matched++;
    });

    const accuracy = Math.round((matched / targetWords.length) * 100);

    if (accuracy >= 50) {
      window.soundFX.playCorrect();
      this.showFeedback(true, `Ajoyib talaffuz! Moslik: ${accuracy}%`);
    } else {
      window.soundFX.playWrong();
      this.showFeedback(false, `Talaffuz mosligi: ${accuracy}%. Yaxshi urinish, davom etamiz!`);
    }
  }

  showFeedback(isSuccess, message) {
    const feedbackZone = document.getElementById("feedback-zone");
    const checkBtn = document.getElementById("btn-check-ex");

    if (feedbackZone) {
      feedbackZone.innerHTML = `
        <div class="feedback-banner ${isSuccess ? 'correct' : 'wrong'}">
          <span>${isSuccess ? '🎉' : '⚠️'}</span>
          <span>${message}</span>
        </div>
      `;
    }

    if (checkBtn) {
      checkBtn.textContent = "Davom etish ➔";
      checkBtn.className = `btn-duo ${isSuccess ? 'btn-duo-green' : 'btn-duo-blue'}`;
      checkBtn.onclick = () => this.nextExercise();
    }
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

    this.state.xp += 50;
    if (!this.state.completedUnits.includes(this.currentLesson.id)) {
      this.state.completedUnits.push(this.currentLesson.id);
    }

    // Unlock next unit
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
        <div style="font-size: 4rem; margin-bottom: 0.8rem;">🏆</div>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--duo-green); margin-bottom: 8px;">
          Dars Muvaffaqiyatli Yakunlandi!
        </h2>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 1.5rem;">
          Siz yangi so'z va grammatikani o'rgandingiz. Keyingi dars ochildi!
        </p>
        <div style="display: inline-flex; gap: 20px; background: rgba(255, 255, 255, 0.05); padding: 12px 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--duo-yellow);">+50</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">XP QO'SHILDI</div>
          </div>
          <div style="border-left: 1px solid var(--border-color); padding-left: 20px;">
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--duo-green);">100%</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">TUGALLANDI</div>
          </div>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <div></div>
      <button class="btn-duo btn-duo-green" onclick="app.closeLessonModal()">
        Xaritaga qaytish ➔
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

    document.querySelectorAll(".mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.soundFX.playClick();
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        this.switchAIMode(mode);
      });
    });

    window.onAISpeechStatus = (isSpeaking) => {
      const avatar = document.getElementById("ai-avatar-glow");
      if (avatar) avatar.classList.toggle("speaking", isSpeaking);
    };

    this.switchAIMode("ielts_examiner");
  }

  switchAIMode(mode) {
    window.groqTutor.resetConversation(mode);
    const container = document.getElementById("ai-chat-messages");
    if (!container) return;
    container.innerHTML = "";

    const titles = {
      ielts_examiner: "IELTS Examiner (David)",
      job_interview: "HR Tech Interviewer",
      cafe: "London Barista (Cafe Order)",
      travel: "Immigration & Travel Concierge",
      free_chat: "Emma (English Buddy)"
    };

    const greetings = {
      ielts_examiner: "Good day! My name is David, your IELTS Speaking Examiner. Let's begin Part 1: Could you tell me about your hometown?",
      job_interview: "Hello! Nice to meet you. Could you briefly introduce yourself and tell me why you want this role?",
      cafe: "Hi there! Welcome to the London Cafe! What can I get started for you today?",
      travel: "Good morning. May I see your passport and purpose of visit?",
      free_chat: "Hey! Awesome to chat with you! What's something fun you did today?"
    };

    const nameEl = document.getElementById("ai-partner-name");
    if (nameEl) nameEl.textContent = titles[mode] || "AI Speaking Partner";
    this.appendAIMessage("assistant", greetings[mode], "");
    window.groqTutor.speakText(greetings[mode]);
  }

  async sendAIMessage(overrideText = null) {
    const input = document.getElementById("ai-chat-input");
    const text = (overrideText || (input ? input.value : "")).trim();
    if (!text) return;

    if (!overrideText && input) input.value = "";
    this.appendAIMessage("user", text);

    const typingId = this.showTypingIndicator();

    try {
      const reply = await window.groqTutor.sendMessage(text);
      this.removeTypingIndicator(typingId);

      const parsed = window.groqTutor.parseReply(reply);
      this.appendAIMessage("assistant", parsed.conversationText, parsed.feedbackText);
      window.groqTutor.speakText(parsed.conversationText);
    } catch (err) {
      this.removeTypingIndicator(typingId);
      this.appendAIMessage("assistant", `⚠️ Kechirasiz, xatolik yuz berdi: ${err.message}. Internet va API kalitingizni tekshiring.`, "");
    }
  }

  appendAIMessage(role, text, feedback = "") {
    const container = document.getElementById("ai-chat-messages");
    if (!container) return;
    const bubble = document.createElement("div");
    bubble.className = `msg-bubble ${role}`;

    let feedbackHtml = "";
    if (feedback) {
      feedbackHtml = `
        <div class="feedback-card-inline">
          <strong>📊 IELTS Maslahat & Tuzatish:</strong><br>
          ${feedback.replace(/\n/g, "<br>")}
        </div>
      `;
    }

    bubble.innerHTML = `<div>${text}</div>${feedbackHtml}`;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  showTypingIndicator() {
    const container = document.getElementById("ai-chat-messages");
    if (!container) return "typ";
    const el = document.createElement("div");
    const id = `typing-${Date.now()}`;
    el.id = id;
    el.className = "msg-bubble assistant";
    el.innerHTML = `<em>Llama 3.3 70B javob qaytarmoqda... ⚡</em>`;
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
      alert("⚠️ Mikrofon ovozini tanish uchun xavfsiz HTTPS kerak. Pastdagi maydonga matn yozishingiz mumkin!");
      return;
    }

    if (this.isAIMicListening) {
      if (this.aiRecognition) {
        try { this.aiRecognition.stop(); } catch(e){}
      }
      this.isAIMicListening = false;
      if (micBtn) micBtn.classList.remove("active");
      window.soundFX.playMicToggle(false);
      return;
    }

    try {
      this.aiRecognition = new SpeechRecognition();
      this.aiRecognition.lang = "en-US";
      this.aiRecognition.interimResults = false;

      this.aiRecognition.onstart = () => {
        this.isAIMicListening = true;
        if (micBtn) micBtn.classList.add("active");
        window.soundFX.playMicToggle(true);
      };

      this.aiRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.sendAIMessage(transcript);
      };

      this.aiRecognition.onerror = (err) => {
        console.error("AI Mic error", err);
        this.isAIMicListening = false;
        if (micBtn) micBtn.classList.remove("active");
      };

      this.aiRecognition.onend = () => {
        this.isAIMicListening = false;
        if (micBtn) micBtn.classList.remove("active");
      };

      this.aiRecognition.start();
    } catch(e) {
      if (micBtn) micBtn.classList.remove("active");
    }
  }

  // ==========================================
  // SHADOWING STUDIO (NO BLOCKING ALERTS)
  // ==========================================
  initShadowingStudio() {
    const container = document.getElementById("shadowing-container");
    if (!container) return;

    container.innerHTML = "";
    window.SHADOWING_DRILLS.forEach((drill, idx) => {
      const card = document.createElement("div");
      card.className = "shadowing-card";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span class="unit-badge status-available">${drill.level}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${drill.phonetic}</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 8px;">${drill.title}</h3>
        <div class="shadowing-text-display">"${drill.text}"</div>
        <div class="shadowing-uzbek"><strong>Tarjimasi:</strong> ${drill.uzbek}</div>
        <p style="font-size: 0.85rem; color: #38bdf8; margin-bottom: 14px;">💡 <strong>Texnika:</strong> ${drill.tips}</p>
        
        <div class="shadowing-controls">
          <button class="btn-duo btn-duo-green" onclick="app.playShadowingAudio('${drill.text.replace(/'/g, "\\'")}', 1.0)">
            🔊 Oddiy (1.0x)
          </button>
          <button class="btn-duo btn-duo-blue" onclick="app.playShadowingAudio('${drill.text.replace(/'/g, "\\'")}', 0.8)">
            🐢 Sekin (0.8x)
          </button>
          <button class="btn-duo btn-duo-purple" onclick="app.startShadowingSpeechCheck('${drill.text.replace(/'/g, "\\'")}', ${idx})">
            🎙️ Ovozni tekshirish
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

  startShadowingSpeechCheck(targetText, idx) {
    const feedbackEl = document.getElementById(`shadowing-feedback-${idx}`);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (feedbackEl) {
        feedbackEl.innerHTML = `<span style="color: #38bdf8;">👍 Audioni eshiting va baland ovozda 3 marta taqlid qiling! (Mikrofon HTTPS talab qiladi)</span>`;
      }
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      if (feedbackEl) feedbackEl.innerHTML = `<span style="color: #ffd900;">🎙️ Tinglanmoqda... Hozir gapiring!</span>`;
      rec.start();

      rec.onresult = (e) => {
        const spoken = e.results[0][0].transcript;
        const targetWords = targetText.toLowerCase().replace(/[.,!?'"]/g, "").split(/\s+/);
        const spokenWords = spoken.toLowerCase().replace(/[.,!?'"]/g, "").split(/\s+/);
        let matches = 0;
        targetWords.forEach(w => {
          if (spokenWords.includes(w)) matches++;
        });
        const score = Math.round((matches / targetWords.length) * 100);

        if (score >= 60) {
          window.soundFX.playCorrect();
          if (feedbackEl) feedbackEl.innerHTML = `<span style="color: #4ade80;">🎉 Ajoyib natija: ${score}%! Siz aytgan: "${spoken}"</span>`;
        } else {
          window.soundFX.playWrong();
          if (feedbackEl) feedbackEl.innerHTML = `<span style="color: #f87171;">Moslik: ${score}%. Qaytadan eshitib, urinib ko'ring.</span>`;
        }
      };

      rec.onerror = () => {
        if (feedbackEl) feedbackEl.innerHTML = `<span style="color: #94a3b8;">Ovoz eshitilmadi. Qayta bosing.</span>`;
      };
    } catch(e) {
      if (feedbackEl) feedbackEl.innerHTML = `<span style="color: #94a3b8;">Ovoz tekshiruvi boshlanmadi.</span>`;
    }
  }

  // ==========================================
  // SETTINGS
  // ==========================================
  initSettings() {
    const input = document.getElementById("settings-groq-key");
    if (input) {
      input.value = window.groqTutor.getApiKey();
    }
    const nameInput = document.getElementById("settings-user-name");
    if (nameInput) {
      nameInput.value = this.state.userName || "Jamoliddin";
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

  updateUserName(name) {
    if (!name || !name.trim()) return;
    this.state.userName = name.trim();
    this.saveState();
    alert("✅ Ismingiz saqlandi: " + this.state.userName);
  }

  exportProgress() {
    try {
      const dataStr = btoa(unescape(encodeURIComponent(JSON.stringify(this.state))));
      if (navigator.clipboard) {
        navigator.clipboard.writeText(dataStr);
        alert("✅ Natijalaringiz nusxalandi! Ushbu kodni do'stingizga berishingiz yoki boshqa telefonga o'tkazishingiz mumkin.");
      } else {
        prompt("Ushbu zaxira kodini nusxalab oling:", dataStr);
      }
    } catch(e) {
      alert("Nusxalashda xatolik.");
    }
  }

  importProgress() {
    const code = prompt("Zaxira nusxa kodini kiriting:");
    if (!code || !code.trim()) return;
    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
      if (decoded && Array.isArray(decoded.unlockedUnits)) {
        this.state = decoded;
        this.saveState();
        this.renderRoadmap();
        alert("🎉 Natijalaringiz muvaffaqiyatli tiklandi!");
      } else {
        alert("Noto'g'ri kod formati.");
      }
    } catch(e) {
      alert("Kod xato kiritildi.");
    }
  }

  resetAllProgress() {
    if (confirm("Haqiqatan ham natijalarni tozalab, 1-darsdan boshlamoqchimisiz?")) {
      localStorage.removeItem(this.storageKey);
      this.state = this.loadState();
      this.saveState();
      this.renderRoadmap();
      this.switchTab("roadmap");
      alert("Natijalar tozalandi. 1-darsdan boshlashingiz mumkin!");
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

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 12,
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
        p.vy += 0.25;
        p.rotation += p.vr;
        p.life -= 1.4;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.life / 100);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      });

      frame++;
      if (frame < 75) {
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
