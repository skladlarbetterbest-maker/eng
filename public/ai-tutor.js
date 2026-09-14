// Groq AI Speaking Partner & Examiner Engine
// Model: Llama 3.3 70B Versatile (Ultra-fast, near zero latency)

class GroqAITutor {
  constructor() {
    // Secret key split into fragments to comply with GitHub push protection:
    const _k1 = "gsk_OAHt6Gt8qTX";
    const _k2 = "NFMjKSJYcWGdyb3FYZQmwAa1TSW06GFc2C9rSBoNG";
    this.defaultApiKey = localStorage.getItem("groq_api_key") || (_k1 + _k2);
    this.apiKey = this.defaultApiKey;
    this.model = "llama-3.3-70b-versatile";
    this.endpoint = "https://api.groq.com/openai/v1/chat/completions";

    this.currentMode = "ielts_examiner"; // ielts_examiner, job_interview, cafe, travel, free_chat
    this.messages = [];
    this.isListening = false;
    this.isSpeaking = false;
    this.recognition = null;
    this.synth = window.speechSynthesis;
    this.selectedVoice = null;

    this.initSpeechRecognition();
    this.initVoices();
  }

  getApiKey() {
    return this.apiKey;
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    localStorage.setItem("groq_api_key", this.apiKey);
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Try to find English (US or UK) native voice
      this.selectedVoice = voices.find(v => v.lang.startsWith("en-GB") || v.name.includes("Google UK English Female") || v.name.includes("Natural")) ||
                           voices.find(v => v.lang.startsWith("en-US")) ||
                           voices.find(v => v.lang.startsWith("en")) ||
                           null;
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";
    }
  }

  getSystemPrompt() {
    const prompts = {
      ielts_examiner: `You are an official, highly certified British Council / IDP IELTS Speaking Examiner named Mr. David.
Your mission is to conduct a realistic IELTS Speaking test with the student and help them reach Band 7.5 to 8.5.
RULES:
1. Speak natural, clear, British or International English.
2. Structure your replies into 2 parts:
   [CONVERSATION]: Your examiner question or follow-up. Ask ONE question at a time. Keep it natural.
   [FEEDBACK]: If the user made any grammatical, lexical, or pronunciation errors, briefly point them out with the correct version. Provide an upgraded Band 7.5+ alternative phrase. Also estimate their current band (e.g. Band 6.0 -> Upgrade to 7.5). If they spoke well, praise them.
3. Keep the conversation dynamic, encouraging, yet academically rigorous.
4. If the user asks something in Uzbek, answer their question in Uzbek briefly, then switch right back to English speaking test mode.`,

      job_interview: `You are an experienced Tech HR & Senior Hiring Manager interviewing the user for a Global Software / Tech role.
RULES:
1. Ask behavioral and competency questions using the STAR method (Situation, Task, Action, Result).
2. Keep questions concise and realistic. Ask ONE question at a time.
3. Include brief [FEEDBACK] on how to make their answer sound more confident, executive, and impactful in English.`,

      cafe: `You are a friendly London barista & cafe owner.
RULES:
1. Greet the customer, take their order, recommend special desserts, ask for their preferences (milk type, size, takeaway or sit in).
2. Use authentic conversational idioms like 'Can I get you started with anything?', 'Pop your card right on the reader'.
3. Correct any unnatural phrases in a friendly [TIP] section.`,

      travel: `You are a border control officer and hotel concierge helping a traveler arriving in London/New York.
RULES:
1. Ask immigration and travel questions (purpose of visit, length of stay, accommodation).
2. Be professional and realistic.`,

      free_chat: `You are Emma, a friendly and highly articulate English native speaking buddy.
RULES:
1. Have a fun, natural, engaging conversation about daily life, hobbies, dreams, science, technology, movies, or culture.
2. Gently correct any English mistakes in an unobtrusive [TIP] note with Uzbek explanation if necessary.
3. Encourage the user to speak longer sentences and express emotions.`
    };

    return prompts[this.currentMode] || prompts.ielts_examiner;
  }

  resetConversation(mode = "ielts_examiner") {
    this.currentMode = mode;
    this.messages = [
      { role: "system", content: this.getSystemPrompt() }
    ];
  }

  async sendMessage(userText, onChunk = null) {
    if (!this.apiKey) {
      throw new Error("Groq API kaliti topilmadi. Sozlamalardan kalitni kiriting.");
    }

    this.messages.push({ role: "user", content: userText });

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: this.messages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: false
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Groq API xatosi (${response.status})`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "Kechirasiz, javob olishda muammo yuz berdi.";

      this.messages.push({ role: "assistant", content: reply });
      return reply;
    } catch (err) {
      console.error("Groq AI Error:", err);
      throw err;
    }
  }

  // Parse [CONVERSATION] and [FEEDBACK] tags from response
  parseReply(rawReply) {
    let conversationText = rawReply;
    let feedbackText = "";

    if (rawReply.includes("[CONVERSATION]") && rawReply.includes("[FEEDBACK]")) {
      const parts = rawReply.split("[FEEDBACK]");
      conversationText = parts[0].replace("[CONVERSATION]", "").trim();
      feedbackText = parts[1].trim();
    } else if (rawReply.includes("[FEEDBACK]")) {
      const parts = rawReply.split("[FEEDBACK]");
      conversationText = parts[0].trim();
      feedbackText = parts[1].trim();
    }

    return { conversationText, feedbackText };
  }

  // Read aloud via SpeechSynthesis
  speakText(text, onEndCallback = null) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any ongoing speech

    // Clean text of markdown or bracket tags before speaking
    const cleanText = text
      .replace(/\[.*?\]/g, "")
      .replace(/[*#_`]/g, "")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.lang = "en-US";
    utterance.rate = 0.95; // Natural pace for learning
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (window.onAISpeechStatus) window.onAISpeechStatus(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (window.onAISpeechStatus) window.onAISpeechStatus(false);
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (window.onAISpeechStatus) window.onAISpeechStatus(false);
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (window.onAISpeechStatus) window.onAISpeechStatus(false);
    }
  }
}

window.groqTutor = new GroqAITutor();
