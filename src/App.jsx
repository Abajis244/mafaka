import React, { useState, useEffect } from 'react';
import {
  Shield,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  History,
  Lock,
  Unlock,
  XCircle,
  Eye,
  LogOut,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Language Dictionary
// ─────────────────────────────────────────────────────────────────────────────
const STRINGS = {
  en: {
    // Header
    prototype: "Prototype",
    leaveQuickly: "Leave quickly",
    exit: "Exit",
    quickExitTitle: "Leaves this screen. Double-press Esc to also exit.",

    // Landing
    tagline: "You can ask for help",
    taglineB: "without handing over everything.",
    subtitle: "MAFAKA is a consent prototype. It lets you start a case privately, share only what you choose, and change your mind later.",
    startPrivately: "Start privately",
    alreadyHaveCase: "I already have a case",
    principle: "The principle",
    caseIsNotAccess: "A case is not\nan access permission.",
    principleBody: "When you ask for help, the system shouldn't assume everyone involved needs to see everything. Your identity information is not released unless you approve a request.",
    prototypeNote: "Not a secure platform. A working prototype of a consent model.",
    howItWorks: "How MAFAKA works",

    step1Title: "Start privately",
    step1Desc: "No name. No phone number. Just your situation.",
    step2Title: "Tell us what happened",
    step2Desc: "Only the basics, in your own words.",
    step3Title: "We connect you",
    step3Desc: "Your case goes to a responder in your region.",
    step4Title: "They ask first",
    step4Desc: "They must request specific details and say why.",
    step5Title: "You decide",
    step5Desc: "Allow, decline, or stop sharing any time.",
    enterResponder: "Enter responder workspace",

    footerPrincipleTitle: "The principle behind MAFAKA",
    footerPrincipleBody: "When someone asks for help, the system should not assume that everyone involved needs access to everything. MAFAKA explores a different model: information can remain protected until someone asks for it, explains why they need it, and the person decides whether to share it.",
    footerPrototypeBody: "The current prototype demonstrates that consent flow. Production deployment would require a hardened security and access-control architecture around it.",
    footerProtection: "Protection is enforced by this application's interface. In production, it would be enforced by a server.",

    // Intake
    step: "Step",
    of: "of",

    helpWith: "What do you need help with?",
    helpWithSub: "Choose what fits best. You can tell us more later.",

    safeNow: "Are you in immediate physical danger?",
    safeNowSub: "Please answer honestly so we can guide you appropriately.",

    dangerNearby: "Is the person causing harm nearby?",

    safetyWarningTitle: "Your safety comes first.",
    safetyWarningBody: "You can still continue, but MAFAKA cannot provide physical rescue. Consider contacting emergency services (112) or someone you trust who can safely reach you.",

    regionSelect: "Where should we look for support?",
    regionSelectSub: "This helps us identify an appropriate available responder.",

    incident: "Tell us what happened.",
    incidentSub: "In your own words. Take your time.",
    incidentNudge: "Keep identifying information out of this description. You can add identity details separately.",
    identifyingWarning: "Your description may contain a name, address, or contact detail. Consider removing details that could identify you before continuing.",
    incidentPlaceholder: "What happened? When and where did it occur?",

    controlShare: "You control what you share",
    controlShareSub: "These details can be shared later if a responder requests them. You can continue without identifying yourself. Providing information here does not automatically mean every responder can view it.",

    nameLabel: "Name or alias",
    phoneLabel: "Safe phone number",
    emailLabel: "Email address",
    optional: "(optional)",

    continueBtn: "Continue",
    backBtn: "← Back",
    createCaseBtn: "Create my case",

    // Intake options
    categories: {
      "Domestic violence": "Domestic violence",
      "Sexual violence or harassment": "Sexual violence or harassment",
      "Child protection": "Child protection",
      "Workplace harassment": "Workplace harassment",
      "Something else": "Something else",
    },

    regions: {
      Lagos: "Lagos",
      Abuja: "Abuja",
      Kano: "Kano",
      Other: "Other",
    },

    yes: "Yes",
    no: "No",
    notSure: "Not sure",

    // Recovery
    caseOpen: "Your case is open.",
    caseOpenSub: "You can return to it any time with the details below.",
    caseNumber: "Case number",
    recoveryKey: "Recovery key",
    saveKeyWarning: "Save this somewhere safe. In a production system, your recovery key is your only way back into this case if you leave this device.",
    sharedPhoneWarning: "If you share this phone with someone you fear, write the key down and keep it somewhere they won't find it. You can delete this case from this device later, from your dashboard.",
    savedKeyCheck: "I have saved my recovery key",
    viewMyCase: "View my case",

    // What happens next
    nextSteps: "What happens next",
    caseIsWith: "Your case is with",
    expectations: "Here's what to expect — and what you can do.",

    next1Title: "They can begin reviewing your case without your identity",
    next1Body: "The responder sees your category, region, and the story you told, but not your name, phone, or email. They can begin reviewing the case using that information alone.",

    next2Title: "If they need more, they ask",
    next2Body: "They will request specific details and give a reason. You'll see the request on your dashboard. You decide whether to approve or decline.",

    next3Title: "No additional identity information is shared until you say so",
    next3Body: "Your identity information is not released unless you approve a request. Consent is per field, and you can stop future sharing at any time.",

    next4Title: "If you never return",
    next4Body: "Your case can remain open without releasing your identity. They can still act on context alone. You can always return with your case number and recovery key to see everything that happened while you were away.",

    next5Title: "Your rights",
    next5Body: "You can decline any request, ask what happens to your information, and withdraw from the process at any time. You do not owe anyone an explanation.",

    goToCase: "Go to my case",

    // Survivor login
    returnToCase: "Return to your case",
    recoveryDescription: "Prototype recovery mechanism. Enter the case number and recovery key you saved.",
    caseCredentialsError: "That case number and key don't match.",
    accessCase: "Access case",
    cancel: "Cancel",
    demoEnvironment: "Demo environment: This prototype stores case data locally on this device. Production deployment would use authenticated backend access controls.",
    caseNumberPlaceholder: "MA-XXXX-XXXX",
    recoveryKeyPlaceholder: "XXXX-XXXX-XXXX-XXXX",

    // Dashboard
    caseDashboard: "Case Dashboard",
    assignedTo: "Assigned to:",
    actionNeeded: "Action needed",
    isRequesting: "is requesting:",

    why: "Why",
    duration: "Duration",
    allow: "Allow",
    decline: "Decline",
    declineNote: "Declining won't change how your case is handled.",

    whoCanSeeWhat: "Who can see what",
    incidentSummary: "Incident summary",
    basicCaseDetails: "Basic case details",

    shared: "Shared",
    accessible: "Accessible",
    protected: "Protected",
    previouslyShared: "Previously shared",
    neverShared: "Never shared",

    sharedWith: "Shared with:",
    purpose: "Purpose:",
    expires: "Expires:",
    revoked: "Revoked",

    stopFutureSharing: "Stop future sharing",
    stopSharingTitle: "Stops future access. Cannot undo what has already been seen.",
    stopSharingNote: "Stopping sharing changes what a responder can see from now on. It cannot remove information that has already been viewed, copied, or exported.",

    withdrawCase: "Withdraw this case",
    deleteFromDevice: "Delete this case from this device",

    messages: "Messages",
    notEncrypted: "Not encrypted in this prototype.",
    noMessages: "No messages yet.",
    typeMessage: "Type a message...",
    messageInputLabel: "Message Input",

    communicationClosed: "Case {status}. Communication closed.",

    caseTimeline: "Case timeline",

    // Statuses
    statuses: {
      "Submitted": "Submitted",
      "Being reviewed": "Being reviewed",
      "Support in progress": "Support in progress",
      "Resolved": "Resolved",
      "Withdrawn": "Withdrawn",
    },

    withdrawnMessage: "This case has been withdrawn.",

    // Identity fields
    identityFields: {
      "Name": "Name",
      "Phone number": "Phone number",
      "Email address": "Email address",
    },

    // Confirmations
    withdrawConfirm: "Withdraw this case? Your details will be protected again and communication will close. Note: information a responder already saw stays with them.",
    deleteConfirm: "Delete this case from this device? In this prototype the case is stored only here, so it will be gone for good. In production it would live on a server and your key would restore it.",

    // Time
    justNow: "just now",
    minute: "minute",
    minutes: "minutes",
    hour: "hour",
    hours: "hours",
    day: "day",
    days: "days",
    ago: "ago",

    // Timeline events
    timelineCaseStarted: "Case started privately.",
    timelineCaseRouted: "Case routed to {org}. {why}",
    timelineAccessApproved: "Access to {fields} approved.",
    timelineAccessDeclined: "Access to {fields} declined.",
    timelineAccessRevoked: "Access to {field} revoked.",
    timelineCaseWithdrawn: "Case withdrawn. All identity details protected.",

    // Accessibility
    incidentDescriptionLabel: "Incident description",
  },

  yo: {
    // Header
    prototype: "Àpẹẹrẹ",
    leaveQuickly: "Jáde kíákíá",
    exit: "Jáde",
    quickExitTitle: "Ó máa kúrò lójú-ìwé yìí. Tẹ Esc lẹ́ẹ̀mejì láti jáde pátápátá.",

    // Landing
    tagline: "O lè béèrè fún ìrànlọ́wọ́",
    taglineB: "láì fi gbogbo ohun rẹ lé ẹlòmíràn lọ́wọ́.",
    subtitle: "MAFAKA jẹ́ àpẹẹrẹ bí ìfọwọ́sí ṣe lè ṣiṣẹ́. Ó jẹ́ kí o bẹ̀rẹ̀ ọ̀ràn rẹ ní ìkọ̀kọ̀, pín ohun tí o bá fẹ́ pín nìkan, kí o sì lè yí èrò rẹ padà nígbà tó bá yá.",
    startPrivately: "Bẹ̀rẹ̀ ní ìkọ̀kọ̀",
    alreadyHaveCase: "Mo ti ní ọ̀ràn kan tẹ́lẹ̀",
    principle: "Ìlànà wa",
    caseIsNotAccess: "Ìwọ ló pinnu\nohun tí o fẹ́ pín.",
    principleBody: "Bí o bá béèrè fún ìrànlọ́wọ́, kò túmọ̀ sí pé o ti fi gbogbo ìwífún rẹ lé ẹlòmíràn lọ́wọ́. A kì í pín ìwífún ìdánimọ̀ rẹ ayafi tí o bá fọwọ́ sí i.",
    prototypeNote: "Èyí jẹ́ àpẹẹrẹ lásán, kì í ṣe ẹ̀rọ tó ní ààbò kíkún.",
    howItWorks: "Bí MAFAKA ṣe ń ṣiṣẹ́",

    step1Title: "Bẹ̀rẹ̀ ní ìkọ̀kọ̀",
    step1Desc: "Kò sí orúkọ. Kò sí nọ́ńbà fóònù. Sọ ohun tó ṣẹlẹ̀ nìkan.",
    step2Title: "Sọ ohun tó ṣẹlẹ̀",
    step2Desc: "Sọ ohun tó ṣẹlẹ̀ ní ọ̀rọ̀ ara rẹ.",
    step3Title: "A ó so ọ́ pọ̀",
    step3Desc: "A ó fi ọ̀ràn rẹ ránṣẹ́ sí ẹni tó ń bójú tó irú ọ̀ràn bẹ́ẹ̀ ní agbègbè rẹ.",
    step4Title: "Wọ́n gbọ́dọ̀ béèrè kọ́kọ́",
    step4Desc: "Wọ́n gbọ́dọ̀ béèrè fún ìwífún pàtó, kí wọ́n sì sọ ìdí tí wọ́n fi nílò rẹ̀.",
    step5Title: "Ìwọ ló ń pinnu",
    step5Desc: "O lè fọwọ́ sí i, kọ̀, tàbí dá pípín dúró nígbàkígbà.",
    enterResponder: "Wọ ojú-ìwé àwọn tó ń bójú tó ọ̀ràn",

    footerPrincipleTitle: "Ìlànà tó wà lẹ́yìn MAFAKA",
    footerPrincipleBody: "Nígbà tí ẹnìkan bá béèrè fún ìrànlọ́wọ́, ètò náà kò yẹ kí ó máa ro pé gbogbo ẹni tó wà nínú ọ̀ràn náà gbọ́dọ̀ rí gbogbo ìwífún. MAFAKA ń ṣàfihàn ọ̀nà mìíràn: ìwífún lè wà ní ìdáàbòbò títí tí ẹnìkan yóò fi béèrè fún un, ṣàlàyé ìdí tí wọ́n fi nílò rẹ̀, tí ẹni náà sì pinnu bóyá yóò pín án.",
    footerPrototypeBody: "Àpẹẹrẹ yìí ń fi bí ìfọwọ́sí ṣe ń ṣiṣẹ́ hàn. Bí a bá fẹ́ lò ó gẹ́gẹ́ bí ètò gidi, a ó nílò ètò ààbò àti ìṣàkóso àṣẹ tó lágbára lẹ́yìn rẹ̀.",
    footerProtection: "Nínú àpẹẹrẹ yìí, ojú-ìwé ló ń fi ìlànà ìdáàbòbò sílò. Nínú ètò gidi, server ni yóò máa fi í sílò.",

    // Intake
    step: "Ìgbésẹ̀",
    of: "nínú",

    helpWith: "Kí ni o nílò ìrànlọ́wọ́ fún?",
    helpWithSub: "Yan èyí tó bá ọ mu jù. O lè ṣàlàyé síi lẹ́yìn náà.",

    safeNow: "Ṣé o wà nínú ewu ara ní báyìí?",
    safeNowSub: "Jọ̀wọ́ sọ gbégede kí a lè mọ bí a ṣe lè ràn ọ́ lọ́wọ́.",

    dangerNearby: "Ṣé ẹni tó ń ṣe ọ́ ní ibi wà nítòsí?",

    safetyWarningTitle: "Ààbò rẹ ṣe pàtàkì jùlọ.",
    safetyWarningBody: "O lè tẹ̀síwájú, ṣùgbọ́n MAFAKA kò lè wá gbà ọ́ sílẹ̀ nípa ti ara. Ronú láti pe àwọn iṣẹ́ pàjáwìrì (112) tàbí ẹnìkan tí o fọkàn tán tí ó lè dé bá ọ láì fi ọ́ sínú ewu.",

    regionSelect: "Ibo ni kí a ti wá ìrànlọ́wọ́ fún ọ?",
    regionSelectSub: "Èyí yóò ràn wá lọ́wọ́ láti mọ ẹni tó yẹ tó sì lè ràn ọ́ lọ́wọ́.",

    incident: "Sọ ohun tó ṣẹlẹ̀ fún wa.",
    incidentSub: "Sọ ọ́ ní ọ̀rọ̀ ara rẹ. Má ṣe yára.",
    incidentNudge: "Má ṣe fi ìwífún tó lè fi mọ ẹni tí o jẹ́ síhìn-ín. O lè fi ìwífún ìdánimọ̀ sílẹ̀ ní apá mìíràn.",
    identifyingWarning: "Ó dàbí pé àlàyé rẹ lè ní orúkọ, àdírẹ́sì, tàbí ìwífún ìbánisọ̀rọ̀. Ronú láti yọ ohun tó lè fi mọ ẹni tí o jẹ́ kúrò kí o tó tẹ̀síwájú.",
    incidentPlaceholder: "Kí ló ṣẹlẹ̀? Ìgbà wo ni ó ṣẹlẹ̀, àti ibo ni ó ti ṣẹlẹ̀?",

    controlShare: "Ìwọ ló ń pinnu ohun tí o fẹ́ pín.",
    controlShareSub: "A lè pín àwọn ìwífún wọ̀nyí lẹ́yìn náà tí ẹni tó ń bójú tó ọ̀ràn bá béèrè fún wọn. O lè tẹ̀síwájú láì sọ ẹni tí o jẹ́. Fífi ìwífún síhìn-ín kò túmọ̀ sí pé gbogbo ẹni tó ń bójú tó ọ̀ràn lè rí i.",

    nameLabel: "Orúkọ tàbí orúkọ àpèjẹ",
    phoneLabel: "Nọ́ńbà fóònù tí o lè lò láìsí ewu",
    emailLabel: "Àdírẹ́sì imeèlì",
    optional: "(kò pọn dandan)",

    continueBtn: "Tẹ̀síwájú",
    backBtn: "← Padà",
    createCaseBtn: "Ṣí ọ̀ràn mi",

    categories: {
      "Domestic violence": "Ìwà ipá nínú ilé",
      "Sexual violence or harassment": "Ìwà ipá tàbí ìfìyàjẹ́pọ̀ nípa ìbálòpọ̀",
      "Child protection": "Ààbò ọmọ",
      "Workplace harassment": "Ìfìyàjẹ́pọ̀ níbi iṣẹ́",
      "Something else": "Ohun mìíràn",
    },

    regions: {
      Lagos: "Lágọ́ọ̀sì",
      Abuja: "Àbújá",
      Kano: "Káno",
      Other: "Ibòmíràn",
    },

    yes: "Bẹ́ẹ̀ni",
    no: "Rárá",
    notSure: "Mi ò dájú",

    // Recovery
    caseOpen: "A ti ṣí ọ̀ràn rẹ.",
    caseOpenSub: "O lè padà sí ọ̀ràn rẹ nígbàkígbà pẹ̀lú àwọn ìwífún tó wà ní ìsàlẹ̀.",
    caseNumber: "Nọ́ńbà ọ̀ràn",
    recoveryKey: "Kọ́kọ́rọ́ ìpadàbọ̀",
    saveKeyWarning: "Fi í pamọ́ sí ibi tó ní ààbò. Nínú ètò gidi, kọ́kọ́rọ́ ìpadàbọ̀ rẹ ni ọ̀nà kan ṣoṣo tí o lè gbà padà sí ọ̀ràn rẹ tí o bá kúrò lórí ẹ̀rọ yìí.",
    sharedPhoneWarning: "Bí o bá ń pín fóònù yìí pẹ̀lú ẹni tí o ń bẹ̀rù, kọ́kọ́rọ́ náà sílẹ̀, kí o sì fi pamọ́ sí ibi tí ẹni náà kò ní rí i. O lè pa ọ̀ràn yìí rẹ́ kúrò lórí ẹ̀rọ yìí lẹ́yìn náà.",
    savedKeyCheck: "Mo ti fi kọ́kọ́rọ́ ìpadàbọ̀ mi pamọ́",
    viewMyCase: "Wo ọ̀ràn mi",

    // What happens next
    nextSteps: "Ohun tí yóò ṣẹlẹ̀ báyìí",
    caseIsWith: "Ọ̀ràn rẹ wà lọ́wọ́",
    expectations: "Èyí ni ohun tí o lè retí àti ohun tí o lè ṣe.",

    next1Title: "Wọ́n lè bẹ̀rẹ̀ sí í wo ọ̀ràn rẹ láì mọ ẹni tí o jẹ́",
    next1Body: "Ẹni tó ń bójú tó ọ̀ràn yóò rí ẹ̀ka ìṣòro rẹ, agbègbè rẹ àti ohun tí o kọ sílẹ̀, ṣùgbọ́n wọn kò ní rí orúkọ, fóònù tàbí imeèlì rẹ. Ìwífún yìí nìkan lè ràn wọ́n lọ́wọ́ láti bẹ̀rẹ̀ iṣẹ́.",

    next2Title: "Tí wọ́n bá nílò síi, wọ́n máa béèrè",
    next2Body: "Wọ́n máa béèrè fún ìwífún pàtó, wọ́n sì máa sọ ìdí tí wọ́n fi nílò rẹ̀. Ìwọ yóò rí ìbéèrè náà lórí ojú-ìwé ọ̀ràn rẹ. Ìwọ ló máa pinnu bóyá o fẹ́ fọwọ́ sí i tàbí kọ̀.",

    next3Title: "A kì í pín ìwífún ìdánimọ̀ síi títí tí o fi fọwọ́ sí i",
    next3Body: "A kì í pín ìwífún ìdánimọ̀ rẹ ayafi tí o bá fọwọ́ sí ìbéèrè. Ìfọwọ́sí jẹ́ fún ìwífún kọ̀ọ̀kan, o sì lè dá pípín dúró nígbàkígbà.",

    next4Title: "Bí o kò bá padà wá",
    next4Body: "Ọ̀ràn rẹ lè wà ní ṣíṣí láì fi ìdánimọ̀ rẹ hàn. Wọ́n tún lè ṣiṣẹ́ pẹ̀lú ohun tí o ti sọ. O lè padà wá pẹ̀lú nọ́ńbà ọ̀ràn àti kọ́kọ́rọ́ ìpadàbọ̀ rẹ láti rí ohun tó ṣẹlẹ̀ nígbà tí o kò sí níbẹ̀.",

    next5Title: "Àwọn ẹ̀tọ́ rẹ",
    next5Body: "O lè kọ̀ sí ìbéèrè èyíkéyìí, béèrè ohun tí yóò ṣẹlẹ̀ sí ìwífún rẹ, tàbí yọ ara rẹ kúrò nínú ètò yìí nígbàkígbà. O kò jẹ ẹnìkẹ́ni ní gbèsè àlàyé.",

    goToCase: "Lọ sí ọ̀ràn mi",

    // Survivor login
    returnToCase: "Padà sí ọ̀ràn rẹ",
    recoveryDescription: "Ètò ìpadàbọ̀ àpẹẹrẹ. Tẹ nọ́ńbà ọ̀ràn àti kọ́kọ́rọ́ ìpadàbọ̀ tí o fi pamọ́.",
    caseCredentialsError: "Nọ́ńbà ọ̀ràn àti kọ́kọ́rọ́ náà kò bá ara wọn mu.",
    accessCase: "Wọlé sí ọ̀ràn",
    cancel: "Fagilé",
    demoEnvironment: "Àyíká àpẹẹrẹ: Nínú àpẹẹrẹ yìí, a ń fi ìwífún ọ̀ràn pamọ́ lórí ẹ̀rọ yìí nìkan. Nínú ètò gidi, server tó ní ìṣàkóso àṣẹ àti ìdánimọ̀ ni yóò máa ṣàkóso ìwọlé.",
    caseNumberPlaceholder: "MA-XXXX-XXXX",
    recoveryKeyPlaceholder: "XXXX-XXXX-XXXX-XXXX",

    // Dashboard
    caseDashboard: "Ojú-ìwé ọ̀ràn rẹ",
    assignedTo: "A ti fi sí ọwọ́:",
    actionNeeded: "Ìgbésẹ̀ kan nílò",
    isRequesting: "ń béèrè fún:",

    why: "Ìdí",
    duration: "Àkókò",
    allow: "Fọwọ́ sí i",
    decline: "Kọ̀",
    declineNote: "Bí o bá kọ̀, kò ní yí bí a ṣe ń bójú tó ọ̀ràn rẹ padà.",

    whoCanSeeWhat: "Ta ló lè rí ohun tí?",
    incidentSummary: "Àkótán ohun tó ṣẹlẹ̀",
    basicCaseDetails: "Àwọn ìwífún kókó",

    shared: "A ti pín",
    accessible: "Wọ́n lè rí i",
    protected: "A dáàbò bò ó",
    previouslyShared: "A ti pín tẹ́lẹ̀",
    neverShared: "A kò tíì pín rí",

    sharedWith: "A pín pẹ̀lú:",
    purpose: "Ìdí:",
    expires: "Yóò parí:",
    revoked: "A ti dáwọ́ dúró",

    stopFutureSharing: "Dá pípín dúró",
    stopSharingTitle: "Ó máa dá ìwọlé síi dúró. Kò lè yí ohun tí wọ́n ti rí padà.",
    stopSharingNote: "Dídá pípín dúró yóò yí ohun tí ẹni tó ń bójú tó ọ̀ràn lè rí padà láti ìsinsìnyí lọ. Kò lè yọ ìwífún tí wọ́n ti rí, daakọ tàbí fi pamọ́ tẹ́lẹ̀ kúrò.",

    withdrawCase: "Yọ ọ̀ràn yìí kúrò",
    deleteFromDevice: "Pa ọ̀ràn yìí rẹ́ lórí ẹ̀rọ yìí",

    messages: "Àwọn ìránṣẹ́",
    notEncrypted: "Àwọn ìránṣẹ́ kò ní ìdáàbòbò ìfìpamọ́ kíkún nínú àpẹẹrẹ yìí.",
    noMessages: "Kò sí ìránṣẹ́ kankan báyìí.",
    typeMessage: "Kọ ìránṣẹ́ kan...",
    messageInputLabel: "Ìwé ìránṣẹ́",

    communicationClosed: "A ti {status} ọ̀ràn. Ìbánisọ̀rọ̀ ti dáwọ́ dúró.",

    caseTimeline: "Ìtẹ̀lé ohun tó ṣẹlẹ̀",

    statuses: {
      "Submitted": "A ti fi ránṣẹ́",
      "Being reviewed": "Wọ́n ń ṣe àyẹ̀wò rẹ̀",
      "Support in progress": "Ìrànlọ́wọ́ ń lọ lọ́wọ́",
      "Resolved": "A ti parí rẹ̀",
      "Withdrawn": "A ti yọ ọ̀ràn náà kúrò",
    },

    withdrawnMessage: "A ti yọ ọ̀ràn yìí kúrò.",

    identityFields: {
      "Name": "Orúkọ",
      "Phone number": "Nọ́ńbà fóònù",
      "Email address": "Àdírẹ́sì imeèlì",
    },

    // Confirmations
    withdrawConfirm: "Ṣé o fẹ́ yọ ọ̀ràn yìí kúrò? A ó dáàbò bo ìwífún rẹ̀ lẹ́ẹ̀kansi, ìbánisọ̀rọ̀ sì máa dáwọ́ dúró. Àkíyèsí: ìwífún tí ẹni tó ń bójú tó ọ̀ràn ti rí ṣáájú yóò wà lọ́dọ̀ wọn.",
    deleteConfirm: "Ṣé o fẹ́ pa ọ̀ràn yìí rẹ́ kúrò lórí ẹ̀rọ yìí? Nínú àpẹẹrẹ yìí, ọ̀ràn náà wà lórí ẹ̀rọ yìí nìkan, nítorí náà ó máa sọnù pátápátá. Nínú ètò gidi, ọ̀ràn náà máa wà lórí server, kọ́kọ́rọ́ rẹ sì máa jẹ́ kí o padà wọlé.",

    // Time
    justNow: "ní báyìí",
    minute: "ìṣẹ́jú",
    minutes: "ìṣẹ́jú",
    hour: "wákàtí",
    hours: "wákàtí",
    day: "ọjọ́",
    days: "ọjọ́",
    ago: "sáájú",

    // Timeline events
    timelineCaseStarted: "A bẹ̀rẹ̀ ọ̀ràn náà ní ìkọ̀kọ̀.",
    timelineCaseRouted: "A fi ọ̀ràn náà ránṣẹ́ sí {org}. {why}",
    timelineAccessApproved: "A fọwọ́ sí ìwọlé sí {fields}.",
    timelineAccessDeclined: "A kọ̀ ìbéèrè ìwọlé sí {fields}.",
    timelineAccessRevoked: "A dá ìwọlé sí {field} dúró.",
    timelineCaseWithdrawn: "A yọ ọ̀ràn náà kúrò. A dáàbò bo gbogbo ìwífún ìdánimọ̀.",

    // Accessibility
    incidentDescriptionLabel: "Àlàyé ohun tó ṣẹlẹ̀",
  }
};

const interpolate = (text, values = {}) => {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{${key}\\}`, 'g'), value ?? ''),
    text
  );
};

const translateEvent = (event, t) => {
  if (!event) return '';
  if (event === 'Case started privately.') return t.timelineCaseStarted;
  const routedMatch = event.match(/^Case routed to (.+?)\. (.+)$/);
  if (routedMatch) return interpolate(t.timelineCaseRouted, { org: routedMatch[1], why: routedMatch[2] });
  const approvedMatch = event.match(/^Access to (.+) approved\.$/);
  if (approvedMatch) return interpolate(t.timelineAccessApproved, { fields: approvedMatch[1] });
  const declinedMatch = event.match(/^Access to (.+) declined\.$/);
  if (declinedMatch) return interpolate(t.timelineAccessDeclined, { fields: declinedMatch[1] });
  const revokedMatch = event.match(/^Access to (.+) revoked\.$/);
  if (revokedMatch) {
    const field = revokedMatch[1]
      .replace(/^phone number$/i, t.identityFields['Phone number'])
      .replace(/^email address$/i, t.identityFields['Email address'])
      .replace(/^name$/i, t.identityFields.Name);
    return interpolate(t.timelineAccessRevoked, { field });
  }
  if (event === 'Case withdrawn. All identity details protected.') return t.timelineCaseWithdrawn;
  return event;
};

const formatTime = (iso, lang = 'en') =>
  new Date(iso).toLocaleString(lang === 'yo' ? 'yo-NG' : 'en-NG', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

const humanTimeAgo = (iso, t) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t.justNow;
  if (mins < 60) return `${mins} ${mins === 1 ? t.minute : t.minutes} ${t.ago}`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? t.hour : t.hours} ${t.ago}`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? t.day : t.days} ${t.ago}`;
};

const emptyPermission = () => ({ granted: false, purpose: null, grantedAt: null, expiresAt: null, revokedAt: null });

const generateId = (prefix) => {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(4);
    crypto.getRandomValues(arr);
    return `${prefix}-${Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 4).toUpperCase()}-${Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').substring(4, 8).toUpperCase()}`;
  }
  return `${prefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. State & Boundary Layer
// ─────────────────────────────────────────────────────────────────────────────
const useCases = () => {
  const [cases, setCases] = useState({});

  useEffect(() => {
    // Migration: boolean permissions -> objects
    const raw = JSON.parse(localStorage.getItem('mafaka_cases') || '{}');
    let migrated = false;
    Object.keys(raw).forEach((id) => {
      const c = raw[id];
      if (c.permissions && typeof c.permissions.name === 'boolean') {
        c.permissions = {
          name: { granted: c.permissions.name, purpose: null, grantedAt: null, expiresAt: null, revokedAt: null },
          phone: { granted: c.permissions.phone, purpose: null, grantedAt: null, expiresAt: null, revokedAt: null },
          email: { granted: c.permissions.email, purpose: null, grantedAt: null, expiresAt: null, revokedAt: null },
        };
        migrated = true;
      }
    });
    if (migrated) localStorage.setItem('mafaka_cases', JSON.stringify(raw));

    const handleStorage = () => setCases(JSON.parse(localStorage.getItem('mafaka_cases') || '{}'));
    handleStorage();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('mafaka_update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mafaka_update', handleStorage);
    };
  }, []);

  const updateCase = (id, updateFn) => {
    setCases(prev => {
      const updated = { ...prev, [id]: updateFn(prev[id]) };
      localStorage.setItem('mafaka_cases', JSON.stringify(updated));
      window.dispatchEvent(new Event('mafaka_update'));
      return updated;
    });
  };

  const addCase = (newCase) => {
    setCases(prev => {
      const updated = { ...prev, [newCase.id]: newCase };
      localStorage.setItem('mafaka_cases', JSON.stringify(updated));
      window.dispatchEvent(new Event('mafaka_update'));
      return updated;
    });
  };

  const deleteCase = (id) => {
    setCases(prev => {
      const updated = { ...prev };
      delete updated[id];
      localStorage.setItem('mafaka_cases', JSON.stringify(updated));
      window.dispatchEvent(new Event('mafaka_update'));
      return updated;
    });
  };

  return { cases, addCase, updateCase, deleteCase };
};

// Prototype access boundary
// Produces the responder-visible representation of a case.
// Production enforcement would happen server-side.
const enforceResponderAccess = (caseData) => {
  if (!caseData) return null;
  const safeData = JSON.parse(JSON.stringify(caseData));

  safeData.identity = safeData.identity || { name: '', phone: '', email: '' };
  safeData.permissions = safeData.permissions || {
    name: { granted: false }, phone: { granted: false }, email: { granted: false },
  };

  safeData.hasIdentityData = {
    name: !!safeData.identity.name,
    phone: !!safeData.identity.phone,
    email: !!safeData.identity.email
  };

  if (!safeData.permissions.name?.granted) safeData.identity.name = null;
  if (!safeData.permissions.phone?.granted) safeData.identity.phone = null;
  if (!safeData.permissions.email?.granted) safeData.identity.email = null;

  return safeData;
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Components
// ─────────────────────────────────────────────────────────────────────────────
const Header = ({ onNavigate, currentView, lang, setLang, t }) => {
  const handleQuickExit = () => window.location.replace('https://www.google.com');
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (window.lastEsc && Date.now() - window.lastEsc < 500) handleQuickExit();
        window.lastEsc = Date.now();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-[#F8F6F1]/80 backdrop-blur-md border-b border-stone-200/70 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4C] rounded">
          <Shield className="w-5 h-5 text-[#3D5A4C]" strokeWidth={1.75} />
          <span className="font-serif font-medium text-xl tracking-tight text-[#1A1A1A]">MAFAKA</span>
          <span className="ml-1 text-xs font-medium tracking-wide uppercase bg-stone-200/70 text-stone-600 px-2 py-0.5 rounded-full">
            {t.prototype}
          </span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          {currentView.startsWith('responder') && (
            <span className="text-xs font-medium text-stone-500 hidden sm:inline-block tracking-wide">
              Responder workspace
            </span>
          )}
          <div className="flex items-center gap-1 text-xs font-medium mr-2">
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4C] ${lang === 'en' ? 'bg-[#3D5A4C] text-white' : 'text-stone-500 hover:text-stone-800'}`}>EN</button>
            <button onClick={() => setLang('yo')} className={`px-2.5 py-1 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3D5A4C] ${lang === 'yo' ? 'bg-[#3D5A4C] text-white' : 'text-stone-500 hover:text-stone-800'}`}>YO</button>
          </div>
          <button onClick={handleQuickExit} title={t.quickExitTitle} className="flex items-center gap-2 text-stone-600 hover:text-[#1A1A1A] px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded">
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">{t.leaveQuickly}</span>
            <span className="sm:hidden">{t.exit}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const LandingView = ({ onNavigate, t }) => (
  <div className="max-w-3xl mx-auto px-5 py-16 md:py-24 space-y-24 fade-in">
    <div className="text-center space-y-6">
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-medium tracking-tight leading-[1.1]">
        {t.tagline}<br />
        <span className="text-stone-400">{t.taglineB}</span>
      </h1>
      <p className="text-lg text-stone-600 max-w-xl mx-auto leading-relaxed">
        {t.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button onClick={() => onNavigate('intake')} className="w-full sm:w-auto bg-[#3D5A4C] hover:bg-[#32493E] text-white px-8 py-4 rounded-full font-medium transition-all shadow-sm">
          {t.startPrivately}
        </button>
        <button onClick={() => onNavigate('survivor_login')} className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-700 px-8 py-4 rounded-full font-medium border border-stone-200 transition-all shadow-sm">
          {t.alreadyHaveCase}
        </button>
      </div>
    </div>

    <div className="bg-[#1A1A1A] rounded-[2rem] p-10 md:p-14 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3D5A4C]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[#3D5A4C] font-medium mb-3 tracking-wide text-sm uppercase">{t.principle}</div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight whitespace-pre-line">
            {t.caseIsNotAccess}
          </h2>
        </div>
        <div>
          <p className="text-stone-300 leading-relaxed">
            {t.principleBody}
          </p>
          <div className="mt-8 flex items-center gap-2 text-stone-400 text-sm">
            <Lock className="w-4 h-4" />
            <span>{t.prototypeNote}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-10">
      <h3 className="font-serif text-2xl font-medium text-center">{t.howItWorks}</h3>
      <div className="grid sm:grid-cols-5 gap-4 relative">
        <div className="hidden sm:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-stone-200" />
        {[
          { icon: Shield, title: t.step1Title, desc: t.step1Desc },
          { icon: MessageSquare, title: t.step2Title, desc: t.step2Desc },
          { icon: CheckCircle2, title: t.step3Title, desc: t.step3Desc },
          { icon: Lock, title: t.step4Title, desc: t.step4Desc },
          { icon: Unlock, title: t.step5Title, desc: t.step5Desc },
        ].map((step, i) => (
          <div key={i} className="relative bg-[#F8F6F1] z-10 pt-2 flex flex-col items-center text-center px-2">
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center mb-4 shadow-sm text-[#3D5A4C]">
              <step.icon className="w-4 h-4" strokeWidth={2} />
            </div>
            <h4 className="font-medium text-sm text-[#1A1A1A] mb-1.5">{step.title}</h4>
            <p className="text-xs text-stone-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <footer className="pt-16 border-t border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="text-sm text-stone-500 max-w-2xl font-normal leading-relaxed">
          <strong className="text-stone-700 font-medium block mb-2">{t.footerPrincipleTitle}</strong>
          {t.footerPrincipleBody}
          <br /><br />
          {t.footerPrototypeBody}
          <br /><br />
          <span className="italic">{t.footerProtection}</span>
        </div>
        <button onClick={() => onNavigate('responder_login')} className="text-sm font-medium text-stone-600 hover:text-[#1A1A1A] underline underline-offset-4 decoration-stone-400">
          {t.enterResponder}
        </button>
      </div>
    </footer>
  </div>
);

const IntakeFlow = ({ onComplete, t }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ category: '', danger: '', dangerNearby: '', region: '', incident: '', identity: { name: '', phone: '', email: '' } });
  const [identifyingWarning, setIdentifyingWarning] = useState(false);
  const [recoveryId, setRecoveryId] = useState(null);
  const [recoveryKey, setRecoveryKey] = useState(null);
  const [savedKey, setSavedKey] = useState(false);

  const update = (k, v) => setData(p => ({ ...p, [k]: v }));
  const updateId = (k, v) => setData(p => ({ ...p, identity: { ...p.identity, [k]: v } }));

  const checkIdentifyingInfo = (text) => {
    const hasPhone = /[\d\-\+\s]{8,}/.test(text);
    const hasEmail = /@/.test(text);
    setIdentifyingWarning(hasPhone || hasEmail);
  };

  const submitCase = () => {
    const cid = generateId('MA');
    const rkey = generateId('KEY');
    setRecoveryId(cid);
    setRecoveryKey(rkey);

    const ts = new Date().toISOString();
    const isDangerous = data.danger === 'Yes' || data.danger === 'Not sure';

    const newCase = {
      id: cid,
      recoveryKey: rkey,
      status: 'Submitted',
      org: null,
      category: data.category,
      danger: data.danger,
      dangerNearby: data.dangerNearby,
      region: data.region,
      incident: data.incident,
      identity: data.identity,
      permissions: { name: emptyPermission(), phone: emptyPermission(), email: emptyPermission() },
      requests: [],
      messages: [],
      timeline: [{ id: Date.now().toString(), time: ts, event: 'Case started privately.' }]
    };

    if (data.region === 'Lagos') {
      newCase.org = 'SafeHouse Lagos';
      newCase.timeline.push({ id: (Date.now() + 1).toString(), time: ts, event: `Case routed to SafeHouse Lagos. ${isDangerous ? 'Flagged as urgent.' : 'Standard regional routing.'}` });
    } else {
      newCase.org = 'National Response Hub';
      newCase.timeline.push({ id: (Date.now() + 1).toString(), time: ts, event: `Case routed to National Response Hub. ${isDangerous ? 'Flagged as urgent.' : 'Standard routing.'}` });
    }

    onComplete(newCase);
    setStep(6);
  };

  const safetyOptions = [
    { value: 'Yes', label: t.yes },
    { value: 'No', label: t.no },
    { value: 'Not sure', label: t.notSure },
  ];

  if (step === 6) {
    return (
      <div className="max-w-lg mx-auto px-5 py-12 md:py-20 fade-in">
        <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-stone-200 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#3D5A4C]" />
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#3D5A4C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#3D5A4C]" />
            </div>
            <h2 className="font-serif text-3xl text-[#1A1A1A] font-medium tracking-tight">{t.caseOpen}</h2>
            <p className="text-stone-500">{t.caseOpenSub}</p>
          </div>
          <div className="bg-[#F8F6F1] p-6 rounded-2xl space-y-5 border border-stone-200/60">
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-1.5">{t.caseNumber}</div>
              <div className="font-mono text-xl text-[#1A1A1A] bg-white px-4 py-3 rounded-xl border border-stone-200 tracking-wider text-center">{recoveryId}</div>
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-1.5">{t.recoveryKey}</div>
              <div className="font-mono text-xl text-[#1A1A1A] bg-white px-4 py-3 rounded-xl border border-stone-200 tracking-wider text-center select-all">{recoveryKey}</div>
            </div>
          </div>
          <div className="bg-stone-50 p-5 rounded-2xl text-sm text-stone-600 border border-stone-200/60 space-y-3">
            <div>{t.saveKeyWarning}</div>
            <div>{t.sharedPhoneWarning}</div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group p-2">
            <input type="checkbox" checked={savedKey} onChange={(e) => setSavedKey(e.target.checked)} className="w-5 h-5 rounded border-stone-300 text-[#3D5A4C] focus:ring-[#3D5A4C]" />
            <span className="text-stone-700 font-medium group-hover:text-[#1A1A1A] transition-colors">{t.savedKeyCheck}</span>
          </label>
          <button disabled={!savedKey} onClick={() => onComplete({ action: 'view_case', id: recoveryId })} className="w-full bg-[#3D5A4C] disabled:bg-stone-200 disabled:text-stone-400 text-white py-4 rounded-full font-medium transition-colors">
            {t.viewMyCase}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12 md:py-20 fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500 mb-3 uppercase tracking-wider">
          <span>{t.step} {step} {t.of} 5</span>
        </div>
        <div className="h-1 bg-stone-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#3D5A4C] transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-stone-200 shadow-sm min-h-[400px] flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-6 fade-in">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-tight mb-2">{t.helpWith}</h2>
              <p className="text-stone-500 text-sm sm:text-base font-normal">{t.helpWithSub}</p>
            </div>
            <div className="space-y-3">
              {['Domestic violence', 'Sexual violence or harassment', 'Child protection', 'Workplace harassment', 'Something else'].map((cat) => (
                <button key={cat} onClick={() => { update('category', cat); setStep(2); }} className="w-full text-left px-5 py-4 rounded-2xl border border-stone-200 hover:border-[#3D5A4C] hover:bg-[#3D5A4C]/5 text-stone-800 transition-all flex items-center justify-between group">
                  <span className="font-normal">{t.categories[cat]}</span>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#3D5A4C] transition-colors" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 fade-in">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-tight mb-2">{t.safeNow}</h2>
              <p className="text-stone-500 text-sm sm:text-base font-normal">{t.safeNowSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {safetyOptions.map((opt) => (
                <button key={opt.value} onClick={() => update('danger', opt.value)} className={`flex-1 py-3.5 rounded-full border font-normal transition-colors ${data.danger === opt.value ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'}`}>
                  {opt.label}
                </button>
              ))}
            </div>

            {(data.danger === 'Yes' || data.danger === 'Not sure') && (
              <div className="pt-4 space-y-4 fade-in">
                <p className="text-stone-800 font-medium">{t.dangerNearby}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {safetyOptions.map((opt) => (
                    <button key={opt.value} onClick={() => update('dangerNearby', opt.value)} className={`flex-1 py-3.5 rounded-full border font-normal transition-colors ${data.dangerNearby === opt.value ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(data.danger === 'Yes' || data.dangerNearby === 'Yes') && (
              <div className="mt-6 p-5 bg-[#A23B3B]/5 border border-[#A23B3B]/20 rounded-2xl flex gap-4 fade-in">
                <AlertTriangle className="w-6 h-6 text-[#A23B3B] shrink-0" />
                <div>
                  <h4 className="text-[#A23B3B] font-medium mb-1">{t.safetyWarningTitle}</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">{t.safetyWarningBody}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 mt-auto">
              <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-800 px-4 py-2 font-medium">{t.backBtn}</button>
              <button disabled={!data.danger || ((data.danger === 'Yes' || data.danger === 'Not sure') && !data.dangerNearby)} onClick={() => setStep(3)} className="bg-[#3D5A4C] hover:bg-[#32493E] disabled:bg-stone-200 text-white px-8 py-3 rounded-full font-medium transition-colors">
                {t.continueBtn}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 fade-in">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-tight mb-2">{t.regionSelect}</h2>
              <p className="text-stone-500 text-sm sm:text-base font-normal">{t.regionSelectSub}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Lagos', 'Abuja', 'Kano', 'Other'].map((opt) => (
                <button key={opt} onClick={() => update('region', opt)} className={`py-4 rounded-2xl border font-normal transition-colors ${data.region === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'}`}>
                  {t.regions[opt]}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6 mt-auto">
              <button onClick={() => setStep(2)} className="text-stone-500 hover:text-stone-800 px-4 py-2 font-medium">{t.backBtn}</button>
              <button disabled={!data.region} onClick={() => setStep(4)} className="bg-[#3D5A4C] hover:bg-[#32493E] disabled:bg-stone-200 text-white px-8 py-3 rounded-full font-medium transition-colors">
                {t.continueBtn}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 fade-in flex flex-col h-full">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-tight mb-2">{t.incident}</h2>
              <p className="text-stone-500 text-sm sm:text-base font-normal">{t.incidentSub}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl text-sm text-stone-600 border border-stone-200/60 mb-2">
              {t.incidentNudge}
            </div>
            <textarea
              aria-label={t.incidentDescriptionLabel}
              value={data.incident}
              onChange={(e) => { update('incident', e.target.value); checkIdentifyingInfo(e.target.value); }}
              placeholder={t.incidentPlaceholder}
              className="w-full flex-1 min-h-[160px] p-5 rounded-2xl border border-stone-200 focus:border-[#3D5A4C] focus:ring-1 focus:ring-[#3D5A4C] outline-none resize-none placeholder:text-stone-400 text-stone-800"
            />
            {identifyingWarning && (
              <div className="p-4 bg-amber-50 text-amber-800 border border-amber-200/50 rounded-xl text-sm flex gap-3 fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{t.identifyingWarning}</p>
              </div>
            )}
            <div className="flex justify-between pt-4 mt-auto">
              <button onClick={() => setStep(3)} className="text-stone-500 hover:text-stone-800 px-4 py-2 font-medium">{t.backBtn}</button>
              <button disabled={!data.incident.trim()} onClick={() => setStep(5)} className="bg-[#3D5A4C] hover:bg-[#32493E] disabled:bg-stone-200 text-white px-8 py-3 rounded-full font-medium transition-colors">
                {t.continueBtn}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 fade-in">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium tracking-tight mb-2">{t.controlShare}</h2>
              <p className="text-stone-500 text-sm sm:text-base font-normal leading-relaxed">{t.controlShareSub}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t.nameLabel} <span className="text-stone-400 font-normal">{t.optional}</span></label>
                <input type="text" value={data.identity.name} onChange={(e) => updateId('name', e.target.value)} className="w-full p-3.5 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t.phoneLabel} <span className="text-stone-400 font-normal">{t.optional}</span></label>
                <input type="tel" value={data.identity.phone} onChange={(e) => updateId('phone', e.target.value)} className="w-full p-3.5 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">{t.emailLabel} <span className="text-stone-400 font-normal">{t.optional}</span></label>
                <input type="email" value={data.identity.email} onChange={(e) => updateId('email', e.target.value)} className="w-full p-3.5 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] outline-none transition-colors" />
              </div>
            </div>
            <div className="flex justify-between pt-6 mt-auto">
              <button onClick={() => setStep(4)} className="text-stone-500 hover:text-stone-800 px-4 py-2 font-medium">{t.backBtn}</button>
              <button onClick={submitCase} className="bg-[#1A1A1A] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm">
                {t.createCaseBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WhatHappensNext = ({ caseData, onNavigate, t }) => (
  <div className="max-w-2xl mx-auto px-5 py-12 md:py-20 fade-in space-y-12">
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3D5A4C]/10 mb-2">
        <Eye className="w-6 h-6 text-[#3D5A4C]" />
      </div>
      <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-medium tracking-tight">
        {t.nextSteps}
      </h1>
      <div className="text-lg text-stone-600 font-normal bg-white py-3 px-6 rounded-full inline-block border border-stone-200 shadow-sm">
        {t.caseIsWith} <strong className="font-medium text-[#1A1A1A]">{caseData.org}</strong>.
      </div>
      <p className="text-stone-500 mt-2">{t.expectations}</p>
    </div>

    <div className="space-y-4">
      {[
        { title: t.next1Title, body: t.next1Body },
        { title: t.next2Title, body: t.next2Body },
        { title: t.next3Title, body: t.next3Body },
        { title: t.next4Title, body: t.next4Body },
        { title: t.next5Title, body: t.next5Body },
      ].map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex gap-5">
          <div className="w-8 h-8 rounded-full bg-[#F8F6F1] text-[#3D5A4C] font-medium flex items-center justify-center shrink-0 border border-stone-200/60">
            {i + 1}
          </div>
          <div>
            <h3 className="text-[#1A1A1A] font-medium text-lg mb-2">{item.title}</h3>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base">{item.body}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center pt-8 border-t border-stone-200">
      <button onClick={() => onNavigate('survivor_dashboard')} className="bg-[#3D5A4C] hover:bg-[#32493E] text-white px-10 py-4 rounded-full font-medium transition-colors shadow-sm text-lg w-full sm:w-auto">
        {t.goToCase}
      </button>
    </div>
  </div>
);

const SurvivorLogin = ({ cases, onLogin, onNavigate, t }) => {
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const cid = id.trim().toUpperCase();
    const c = cases[cid];
    if (c && c.recoveryKey === key.trim().toUpperCase()) {
      onLogin(cid);
    } else {
      setError(t.caseCredentialsError);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16 md:py-24 fade-in">
      <div className="bg-white rounded-3xl border border-stone-200/80 p-8 md:p-10 space-y-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="text-center">
          <h2 className="font-serif font-medium text-3xl text-[#1A1A1A]">{t.returnToCase}</h2>
          <p className="mt-2 text-stone-600 font-normal text-sm">{t.recoveryDescription}</p>
        </div>
        {error && <div className="p-3 bg-[#A23B3B]/5 text-[#A23B3B] border border-[#A23B3B]/20 rounded-xl text-sm font-normal">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="login_id" className="block text-sm font-medium text-stone-700 mb-1.5">{t.caseNumber}</label>
            <input id="login_id" required type="text" placeholder={t.caseNumberPlaceholder} value={id} onChange={(e) => setId(e.target.value)} className="w-full p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] font-mono outline-none transition-colors placeholder:text-stone-400" />
          </div>
          <div>
            <label htmlFor="login_key" className="block text-sm font-medium text-stone-700 mb-1.5">{t.recoveryKey}</label>
            <input id="login_key" required type="text" placeholder={t.recoveryKeyPlaceholder} value={key} onChange={(e) => setKey(e.target.value)} className="w-full p-3 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] font-mono outline-none transition-colors placeholder:text-stone-400" />
          </div>
          <button type="submit" className="w-full bg-[#3D5A4C] hover:bg-[#32493E] text-white py-3.5 rounded-full font-medium transition-colors mt-2">
            {t.accessCase}
          </button>
        </form>
        <div className="text-center">
          <button onClick={() => onNavigate('home')} className="text-sm text-stone-500 hover:text-stone-800 font-normal">{t.cancel}</button>
        </div>
        <div className="text-center text-xs font-normal text-stone-500 border-t border-stone-200 pt-5">
          {t.demoEnvironment}
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ events, t, lang }) => (
  <div>
    <h3 className="font-serif font-medium text-lg text-[#1A1A1A] mb-5">{t.caseTimeline}</h3>
    <div className="relative border-l border-stone-200 ml-2 space-y-6 pb-2">
      {[...events].reverse().map((ev) => (
        <div key={ev.id} className="relative pl-6">
          <div className="absolute w-2 h-2 bg-stone-300 rounded-full -left-[4.5px] top-2 ring-4 ring-[#F8F6F1]" />
          <div className="text-xs text-stone-500 mb-1 font-normal">{formatTime(ev.time, lang)}</div>
          <div className="text-sm text-stone-800 font-normal leading-relaxed">{translateEvent(ev.event, t)}</div>
        </div>
      ))}
    </div>
  </div>
);

const SurvivorDashboard = ({ caseData, updateCase, onNavigate, onDelete, t, lang }) => {
  const [msg, setMsg] = useState('');

  if (!caseData) return null;

  const isClosed = caseData.status === 'Resolved' || caseData.status === 'Withdrawn';
  const pendingRequests = caseData.requests.filter(r => r.status === 'pending');

  const statusSteps = ['Submitted', 'Being reviewed', 'Support in progress', 'Resolved'];

  const getTimestamp = () => new Date().toISOString();

  const handleRequest = (reqId, decision) => {
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      const req = newC.requests.find(r => r.id === reqId);
      if (!req) return newC;
      
      req.status = decision;
      const ts = getTimestamp();
      
      if (decision === 'approved') {
        const keyMap = { 'Name': 'name', 'Phone number': 'phone', 'Email address': 'email' };
        req.fields.forEach(f => {
          const k = keyMap[f];
          if (k && newC.identity[k]) {
            newC.permissions[k] = {
              granted: true, purpose: req.reason, grantedAt: ts, expiresAt: req.expiresAt, revokedAt: null
            };
          }
        });
      }
      
      newC.timeline.push({ id: Date.now().toString(), time: ts, event: decision === 'approved' ? `Access to ${req.fields.join(', ')} approved.` : `Access to ${req.fields.join(', ')} declined.` });
      return newC;
    });
  };

  const handleRevoke = (fieldLabel) => {
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      const keyMap = { 'Name': 'name', 'Phone number': 'phone', 'Email address': 'email' };
      const k = keyMap[fieldLabel];
      
      if (k && newC.permissions[k]) {
        newC.permissions[k].granted = false;
        newC.permissions[k].revokedAt = getTimestamp();
      }
      
      newC.timeline.push({ id: Date.now().toString(), time: getTimestamp(), event: `Access to ${fieldLabel.toLowerCase()} revoked.` });
      return newC;
    });
  };

  const handleWithdraw = () => {
    if (!window.confirm(t.withdrawConfirm)) return;
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      newC.status = 'Withdrawn';
      ['name', 'phone', 'email'].forEach(k => {
        if (newC.permissions[k]?.granted) {
          newC.permissions[k].granted = false;
          newC.permissions[k].revokedAt = getTimestamp();
        }
      });
      newC.requests.filter(r => r.status === 'pending').forEach(r => r.status = 'declined');
      newC.timeline.push({ id: Date.now().toString(), time: getTimestamp(), event: 'Case withdrawn. All identity details protected.' });
      return newC;
    });
  };

  const handleDeleteDevice = () => {
    if (!window.confirm(t.deleteConfirm)) return;
    onDelete(caseData.id);
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      newC.messages.push({ id: Date.now().toString(), text: msg.trim(), sender: 'survivor', time: getTimestamp() });
      return newC;
    });
    setMsg('');
  };

  const renderPermissionState = (label, internalKey) => {
    const hasData = !!caseData.identity[internalKey];
    if (!hasData) return null;

    const perm = caseData.permissions[internalKey];

    if (perm.granted) {
      return (
        <div className="bg-[#3D5A4C]/5 border border-[#3D5A4C]/20 rounded-xl p-4 fade-in">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2 mb-1">
                {label} <span className="bg-[#3D5A4C] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm">{t.accessible}</span>
              </div>
              <div className="text-stone-600 font-mono text-sm">{caseData.identity[internalKey]}</div>
            </div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-xs text-stone-600 space-y-1.5 mb-3 border border-stone-200/50">
            <div className="flex justify-between"><span className="text-stone-400">{t.sharedWith}</span> <span className="font-medium text-stone-700">{caseData.org}</span></div>
            <div className="flex justify-between"><span className="text-stone-400">{t.purpose}</span> <span>{perm.purpose}</span></div>
            <div className="flex justify-between"><span className="text-stone-400">{t.expires}</span> <span>{formatTime(perm.expiresAt, lang)}</span></div>
          </div>
          <button onClick={() => handleRevoke(label)} className="text-xs text-[#A23B3B] hover:text-red-800 font-medium w-full text-left py-1" title={t.stopSharingTitle}>
            {t.stopFutureSharing}
          </button>
        </div>
      );
    }

    if (perm.revokedAt) {
      return (
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 opacity-80 fade-in">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium text-stone-500 flex items-center gap-2">
              {label} <span className="bg-stone-300 text-stone-700 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1"><History className="w-3 h-3" /> {t.previouslyShared}</span>
            </div>
          </div>
          <div className="text-xs text-stone-400 font-mono mt-1">***</div>
          <div className="mt-3 pt-3 border-t border-stone-200/80 text-xs text-stone-500 space-y-1">
            <div>{t.stopSharingNote}</div>
            <span className="text-xs text-stone-500 font-normal">{t.revoked} {formatTime(perm.revokedAt, lang)}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-stone-200 rounded-xl p-4 fade-in">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-stone-500 flex items-center gap-2">
            {label} <span className="bg-stone-100 text-stone-500 border border-stone-200 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1"><Lock className="w-3 h-3" /> {t.neverShared}</span>
          </div>
        </div>
        <div className="text-xs text-stone-400 font-mono mt-2">***</div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-8 md:py-12 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#1A1A1A] mb-1">{t.caseDashboard}</h1>
          <p className="text-sm text-stone-500 font-mono uppercase tracking-wider">{caseData.id}</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#3D5A4C]" />
          <span className="text-sm font-medium text-stone-700">{t.assignedTo} {caseData.org}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {pendingRequests.length > 0 && (
            <div className="bg-[#3D5A4C]/5 border border-[#3D5A4C]/20 rounded-2xl p-6 space-y-4">
              <h2 className="font-serif font-medium text-xl text-[#1A1A1A] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#3D5A4C]" /> {t.actionNeeded}
              </h2>
              {pendingRequests.map(req => (
                <div key={req.id} className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm fade-in">
                  <div className="text-sm text-stone-600 mb-4">
                    <strong className="text-[#1A1A1A] font-medium">{caseData.org}</strong> {t.isRequesting}
                    <div className="font-medium text-[#1A1A1A] text-base mt-2 mb-4">
                      {req.fields.map(f => t.identityFields[f] || f).join(', ')}
                    </div>
                  </div>
                  <div className="bg-stone-50 p-3.5 rounded-lg mb-5 border border-stone-100">
                    <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t.why}</div>
                    <div className="text-sm text-stone-800 leading-relaxed mb-3">{req.reason}</div>
                    <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">{t.duration}</div>
                    <div className="text-sm text-stone-800">{req.duration || '24 hours'}</div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleRequest(req.id, 'declined')} className="flex-1 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 font-medium text-sm transition-colors">
                      {t.decline}
                    </button>
                    <button onClick={() => handleRequest(req.id, 'approved')} className="flex-1 py-2.5 rounded-full bg-[#3D5A4C] hover:bg-[#32493E] text-white font-medium text-sm transition-colors shadow-sm">
                      {t.allow}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 text-center mt-3">{t.declineNote}</p>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif font-medium text-xl text-[#1A1A1A] mb-6">{t.whoCanSeeWhat}</h2>
            <div className="space-y-4">
              {renderPermissionState(t.identityFields.Name, 'name')}
              {renderPermissionState(t.identityFields['Phone number'], 'phone')}
              {renderPermissionState(t.identityFields['Email address'], 'email')}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif font-medium text-xl text-[#1A1A1A] mb-6">{t.incidentSummary}</h2>
            <div className="space-y-6">
              <div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">{t.basicCaseDetails}</div>
                <div className="flex gap-2">
                  <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">{t.categories[caseData.category]}</span>
                  <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">{t.regions[caseData.region]}</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-2">{t.incidentDescriptionLabel}</div>
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap">{caseData.incident}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-200">
            {!isClosed && (
              <button onClick={handleWithdraw} className="px-5 py-3 rounded-full text-sm font-medium border border-stone-200 text-stone-600 hover:text-[#A23B3B] hover:border-[#A23B3B] hover:bg-[#A23B3B]/5 transition-colors">
                {t.withdrawCase}
              </button>
            )}
            <button onClick={handleDeleteDevice} className="px-5 py-3 rounded-full text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors sm:ml-auto">
              {t.deleteFromDevice}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h3 className="font-serif font-medium text-lg text-[#1A1A1A] mb-5">{t.messages}</h3>
            <div className="flex flex-col h-[300px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                <div className="text-center w-full text-xs text-stone-400 flex items-center justify-center gap-1.5 mb-6">
                  <Unlock className="w-3 h-3" /> {t.notEncrypted}
                </div>
                {caseData.messages.length === 0 ? (
                  <div className="text-center text-sm text-stone-400 mt-10">{t.noMessages}</div>
                ) : (
                  caseData.messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'survivor' ? 'justify-end' : 'justify-start'} fade-in`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'survivor' ? 'bg-[#3D5A4C] text-white rounded-tr-sm' : 'bg-stone-100 text-stone-800 rounded-tl-sm'}`}>
                        {m.text}
                        <div className={`text-[10px] mt-1 text-right ${m.sender === 'survivor' ? 'text-white/70' : 'text-stone-400'}`}>
                          {humanTimeAgo(m.time, t)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {isClosed ? (
                <div className="text-center p-3 text-stone-500 text-sm font-normal bg-stone-50 rounded-xl">
                  {interpolate(t.communicationClosed, { status: t.statuses[caseData.status]?.toLowerCase() || caseData.status })}
                </div>
              ) : (
                <form onSubmit={handleSendMsg} className="flex gap-2">
                  <input aria-label={t.messageInputLabel} type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.typeMessage} className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-full text-sm outline-none focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] placeholder:text-stone-400" />
                  <button type="submit" disabled={!msg.trim()} className="w-11 h-11 shrink-0 bg-[#3D5A4C] disabled:bg-stone-300 text-white rounded-full flex items-center justify-center transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <Timeline events={caseData.timeline} t={t} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Responder Interface (Always English)
// ─────────────────────────────────────────────────────────────────────────────
const ResponderLogin = ({ onLogin, onNavigate }) => {
  const [org, setOrg] = useState('SafeHouse Lagos');
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="max-w-md w-full bg-[#242424] p-8 md:p-10 rounded-[2rem] border border-stone-800 shadow-2xl relative z-10 fade-in">
        <div className="flex items-center gap-2.5 mb-8">
          <Shield className="w-5 h-5 text-stone-400" strokeWidth={1.75} />
          <span className="font-serif font-medium text-xl tracking-tight text-white">MAFAKA</span>
          <span className="ml-1 text-xs font-medium tracking-wide uppercase bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full">
            Responder
          </span>
        </div>
        <h2 className="font-serif text-2xl text-white mb-6">Prototype responder workspace</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">Simulate login as:</label>
            <select value={org} onChange={(e) => setOrg(e.target.value)} className="w-full p-3.5 bg-[#1A1A1A] border border-stone-700 rounded-xl text-white outline-none focus:border-stone-500">
              <option value="SafeHouse Lagos">SafeHouse Lagos</option>
              <option value="National Response Hub">National Response Hub</option>
            </select>
          </div>
          <button onClick={() => onLogin(org)} className="w-full py-3.5 bg-white hover:bg-stone-200 text-[#1A1A1A] rounded-xl font-medium transition-colors mt-2">
            Enter Workspace
          </button>
          <button onClick={() => onNavigate('home')} className="w-full py-2 text-stone-500 hover:text-stone-300 text-sm transition-colors">
            Return to survivor view
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-500 text-center">
          Demo Environment: No real credentials required.
        </div>
      </div>
    </div>
  );
};

const ResponderDashboard = ({ cases, activeOrg, onOpenCase, onLogout }) => {
  const orgCases = Object.values(cases).filter(c => c.org === activeOrg);
  const urgent = orgCases.filter(c => c.danger === 'Yes' || c.dangerNearby === 'Yes').sort((a,b) => b.id.localeCompare(a.id));
  const rest = orgCases.filter(c => c.danger !== 'Yes' && c.dangerNearby !== 'Yes').sort((a,b) => b.id.localeCompare(a.id));
  const sortedCases = [...urgent, ...rest];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-stone-300">
      <header className="bg-[#242424] border-b border-stone-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-stone-400" />
          <span className="font-serif text-white text-lg tracking-wide">MAFAKA <span className="text-stone-500 text-sm ml-2 font-sans">Workspace</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-stone-400">{activeOrg}</span>
          <button onClick={onLogout} className="text-stone-500 hover:text-white transition-colors">Exit</button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10 fade-in">
        <h1 className="text-2xl font-serif text-white mb-8">Assigned Cases</h1>
        {sortedCases.length === 0 ? (
          <div className="text-center py-20 text-stone-500 border border-stone-800 rounded-2xl border-dashed">No cases assigned to this organisation.</div>
        ) : (
          <div className="grid gap-4">
            {sortedCases.map(c => {
              const isUrgent = c.danger === 'Yes' || c.dangerNearby === 'Yes';
              return (
                <div key={c.id} onClick={() => onOpenCase(c.id)} className="bg-[#242424] border border-stone-800 hover:border-stone-600 p-5 rounded-xl flex items-center justify-between cursor-pointer transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isUrgent ? '#A23B3B' : '#3D5A4C' }} />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-white text-sm">{c.id}</span>
                        {isUrgent && <span className="text-[10px] uppercase tracking-wider bg-[#A23B3B]/20 text-[#A23B3B] px-2 py-0.5 rounded-sm">Urgent</span>}
                      </div>
                      <div className="text-sm text-stone-500 flex gap-3">
                        <span>{c.category}</span> • <span>{c.region}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-stone-500">{c.status}</span>
                    <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-stone-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ResponderCaseView = ({ caseData, updateCase, onBack }) => {
  const [requestFields, setRequestFields] = useState([]);
  const [requestReason, setRequestReason] = useState('');
  const [msg, setMsg] = useState('');

  if (!caseData) return null;

  const isUrgent = caseData.danger === 'Yes' || caseData.dangerNearby === 'Yes';
  const isClosed = caseData.status === 'Resolved' || caseData.status === 'Withdrawn';

  const handleStatusChange = (e) => {
    updateCase(caseData.id, c => ({ ...c, status: e.target.value }));
  };

  const getFieldStatus = (key) => {
    const objKey = key === 'phone' ? 'Phone number' : key === 'email' ? 'Email address' : 'Name';
    if (caseData.permissions[key] && caseData.permissions[key].granted) return 'approved';
    const pendingReq = caseData.requests.find((r) => r.status === 'pending' && r.fields.includes(objKey));
    if (pendingReq) return 'pending';
    const declinedReq = caseData.requests.find((r) => r.status === 'declined' && r.fields.includes(objKey));
    if (declinedReq) return 'declined';
    return 'protected';
  };

  const handleRequestAccess = () => {
    if (!requestReason.trim() || requestFields.length === 0) return;
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      const ts = new Date().toISOString();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      const fields = requestFields.map(f => f === 'phone' ? 'Phone number' : f === 'email' ? 'Email address' : 'Name');
      
      newC.requests.push({ id: Date.now().toString(), fields, reason: requestReason, status: 'pending', requestedAt: ts, expiresAt: expires, duration: '24 hours' });
      newC.timeline.push({ id: Date.now().toString(), time: ts, event: `Access to ${fields.join(', ')} requested.` });
      return newC;
    });
    setRequestFields([]);
    setRequestReason('');
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      newC.messages.push({ id: Date.now().toString(), text: msg.trim(), sender: 'responder', time: new Date().toISOString() });
      return newC;
    });
    setMsg('');
  };

  const availableFields = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone number' },
    { key: 'email', label: 'Email address' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-stone-300">
      <header className="bg-[#242424] border-b border-stone-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="text-stone-500 hover:text-white transition-colors">← Back to queue</button>
        <div className="h-4 w-[1px] bg-stone-700" />
        <span className="font-mono text-white tracking-wider">{caseData.id}</span>
        <div className="ml-auto">
          <select value={caseData.status} onChange={handleStatusChange} disabled={caseData.status === 'Withdrawn'} className="bg-[#1A1A1A] border border-stone-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-stone-500 disabled:opacity-50">
            <option value="Submitted">Submitted</option>
            <option value="Being reviewed">Being reviewed</option>
            <option value="Support in progress">Support in progress</option>
            <option value="Resolved">Resolved</option>
            {caseData.status === 'Withdrawn' && <option value="Withdrawn">Withdrawn</option>}
          </select>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8 fade-in">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#242424] rounded-2xl border border-stone-800 p-6 sm:p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-serif text-xl text-white">Incident Report</h2>
              {isUrgent && <span className="bg-[#A23B3B]/20 text-[#A23B3B] text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Urgent</span>}
            </div>
            <div className="flex gap-3 mb-6 pb-6 border-b border-stone-800">
              <span className="bg-[#1A1A1A] px-3 py-1.5 rounded-lg text-sm border border-stone-800">{caseData.category}</span>
              <span className="bg-[#1A1A1A] px-3 py-1.5 rounded-lg text-sm border border-stone-800">{caseData.region}</span>
            </div>
            <p className="text-stone-300 leading-relaxed whitespace-pre-wrap">{caseData.incident}</p>
          </div>

          <div className="bg-[#242424] rounded-2xl border border-stone-800 p-6 sm:p-8">
            <h2 className="font-serif text-xl text-white mb-6">Communication</h2>
            <div className="flex flex-col h-[300px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                {caseData.messages.length === 0 ? (
                  <div className="text-center text-sm text-stone-600 mt-10">No messages yet.</div>
                ) : (
                  caseData.messages.map(m => (
                    <div key={m.id} className={`flex ${m.sender === 'responder' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'responder' ? 'bg-stone-700 text-white rounded-tr-sm' : 'bg-[#1A1A1A] border border-stone-800 text-stone-300 rounded-tl-sm'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {isClosed ? (
                <div className="text-center p-3 text-stone-600 text-sm bg-[#1A1A1A] rounded-xl border border-stone-800">Case {caseData.status.toLowerCase()}.</div>
              ) : (
                <form onSubmit={handleSendMsg} className="flex gap-2">
                  <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="flex-1 p-3 bg-[#1A1A1A] border border-stone-700 rounded-full text-sm outline-none focus:border-stone-500 text-white placeholder:text-stone-600" />
                  <button type="submit" disabled={!msg.trim()} className="w-11 h-11 shrink-0 bg-stone-700 disabled:bg-stone-800 text-white rounded-full flex items-center justify-center transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#242424] rounded-2xl border border-stone-800 p-6">
            <h3 className="font-serif text-lg text-white mb-5">Information Available</h3>
            <div className="space-y-3">
              {availableFields.map(f => {
                const status = getFieldStatus(f.key);
                const hasData = caseData.hasIdentityData[f.key];
                
                if (!hasData) return null;

                return (
                  <div key={f.key} className={`p-4 rounded-xl border flex flex-col justify-center ${status === 'approved' ? 'bg-[#3D5A4C]/10 border-[#3D5A4C]/30' : 'bg-[#1A1A1A] border-stone-800'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-stone-400">{f.label}</span>
                      {status === 'approved' ? (
                        <span className="text-xs font-medium text-[#4CAF50] px-2 py-1 bg-[#4CAF50]/10 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : status === 'pending' ? (
                        <span className="text-xs font-medium text-amber-500 px-2 py-1 bg-amber-500/10 rounded flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : status === 'declined' ? (
                        <span className="text-xs font-medium text-stone-500 px-2 py-1 bg-stone-100/10 rounded flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Declined
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-stone-500 px-2 py-1 bg-stone-800 rounded flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Protected
                        </span>
                      )}
                    </div>
                    {status === 'approved' && (
                      <div className="mt-2">
                        <span className="text-white font-mono">{caseData.identity[f.key]}</span>
                        <span className="text-[10px] text-stone-500 block mt-1">
                          Granted {humanTimeAgo(caseData.permissions[f.key]?.grantedAt, STRINGS.en)}
                        </span>
                      </div>
                    )}
                    {status !== 'approved' && (
                      <div className="text-stone-600 font-mono text-sm mt-1">***</div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isClosed && (
              <div className="mt-6 pt-6 border-t border-stone-800 space-y-4">
                <h4 className="text-sm font-medium text-white">Request Access</h4>
                {availableFields.filter(f => caseData.hasIdentityData[f.key] && ['protected', 'declined'].includes(getFieldStatus(f.key))).length > 0 ? (
                  <div className="space-y-3">
                    {availableFields.filter(f => caseData.hasIdentityData[f.key] && ['protected', 'declined'].includes(getFieldStatus(f.key))).map(f => (
                      <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={requestFields.includes(f.key)} onChange={(e) => {
                          if (e.target.checked) setRequestFields([...requestFields, f.key]);
                          else setRequestFields(requestFields.filter(id => id !== f.key));
                        }} className="w-4 h-4 rounded border-stone-700 bg-[#1A1A1A] text-stone-400 focus:ring-stone-500 focus:ring-offset-[#242424]" />
                        <span className="text-sm text-stone-400">{f.label}</span>
                      </label>
                    ))}
                    {requestFields.length > 0 && (
                      <div className="space-y-3 fade-in">
                        <input type="text" placeholder="State reason for request..." value={requestReason} onChange={(e) => setRequestReason(e.target.value)} className="w-full p-2.5 bg-[#1A1A1A] border border-stone-700 rounded-lg text-sm text-white outline-none focus:border-stone-500 placeholder:text-stone-600" />
                        <button disabled={!requestReason.trim()} onClick={handleRequestAccess} className="w-full py-2.5 bg-white disabled:bg-stone-700 text-[#1A1A1A] disabled:text-stone-500 rounded-lg text-sm font-medium transition-colors">
                          Request additional info
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-stone-600 font-normal">No further information available to request.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Main App Controller
// ─────────────────────────────────────────────────────────────────────────────
const App = () => {
  const [view, setView] = useState('home'); // home, intake, survivor_login, survivor_dashboard, what_happens_next, responder_login, responder_dashboard, responder_case
  const [lang, setLang] = useState('en');
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [activeOrg, setActiveOrg] = useState(null);
  const { cases, addCase, updateCase, deleteCase } = useCases();

  const t = STRINGS[lang];

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans text-[#1A1A1A] selection:bg-[#3D5A4C]/20">
      {!view.startsWith('responder') && (
        <Header onNavigate={setView} currentView={view} lang={lang} setLang={setLang} t={t} />
      )}

      {view === 'home' && <LandingView onNavigate={setView} t={t} />}
      {view === 'intake' && (
        <IntakeFlow onComplete={(res) => {
          if (res.action === 'view_case') {
            setActiveCaseId(res.id);
            setView('what_happens_next');
          } else {
            addCase(res);
          }
        }} t={t} />
      )}
      {view === 'what_happens_next' && <WhatHappensNext caseData={cases[activeCaseId]} onNavigate={setView} t={t} />}
      {view === 'survivor_login' && (
        <SurvivorLogin cases={cases} onLogin={(id) => { setActiveCaseId(id); setView('survivor_dashboard'); }} onNavigate={setView} t={t} />
      )}
      {view === 'survivor_dashboard' && (
        <SurvivorDashboard caseData={cases[activeCaseId]} updateCase={updateCase} onNavigate={setView} onDelete={(id) => { deleteCase(id); setView('home'); }} t={t} lang={lang} />
      )}
      {view === 'responder_login' && (
        <ResponderLogin onLogin={(org) => { setActiveOrg(org); setView('responder_dashboard'); }} onNavigate={setView} />
      )}
      {view === 'responder_dashboard' && (
        <ResponderDashboard 
          cases={Object.fromEntries(Object.entries(cases).map(([id, c]) => [id, enforceResponderAccess(c)]))} 
          activeOrg={activeOrg} 
          onOpenCase={(id) => { setActiveCaseId(id); setView('responder_case'); }} 
          onLogout={() => setView('home')} 
        />
      )}
      {view === 'responder_case' && (
        <ResponderCaseView caseData={enforceResponderAccess(cases[activeCaseId])} updateCase={updateCase} onBack={() => setView('responder_dashboard')} />
      )}
    </div>
  );
};

export default App;