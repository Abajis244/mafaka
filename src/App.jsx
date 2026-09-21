import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Unlock, AlertTriangle, CheckCircle2,
  LogOut, ArrowRight, Eye, MessageSquare, ChevronRight,
  Info, History, Trash2, XCircle
} from 'lucide-react';

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
    safeNow: "Are you safe right now?",
    safeNowSub: "Are you in immediate physical danger?",
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

    categories: {
      "Domestic violence": "Domestic violence",
      "Sexual violence or harassment": "Sexual violence or harassment",
      "Child protection": "Child protection",
      "Workplace harassment": "Workplace harassment",
      "Something else": "Something else",
    },
    regions: { Lagos: "Lagos", Abuja: "Abuja", Kano: "Kano", Other: "Other" },
    yes: "Yes", no: "No", notSure: "Not sure",

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

    statuses: {
      Submitted: "Submitted",
      "Being reviewed": "Being reviewed",
      "Support in progress": "Support in progress",
      Resolved: "Resolved",
      Withdrawn: "Withdrawn",
    },
    withdrawnMessage: "This case has been withdrawn.",
    identityFields: { Name: "Name", "Phone number": "Phone number", "Email address": "Email address" },

    withdrawConfirm: "Withdraw this case? Your details will be protected again and communication will close. Note: information a responder already saw stays with them.",
    deleteConfirm: "Delete this case from this device? In this prototype the case is stored only here, so it will be gone for good. In production it would live on a server and your key would restore it.",

    justNow: "just now", minute: "minute", minutes: "minutes", hour: "hour", hours: "hours", day: "day", days: "days", ago: "ago",

    timelineCaseStarted: "Case started privately.",
    timelineCaseRouted: "Case routed to {org}. {why}",
    timelineAccessApproved: "Access to {fields} approved.",
    timelineAccessDeclined: "Access to {fields} declined.",
    timelineAccessRevoked: "Access to {field} revoked.",
    timelineCaseWithdrawn: "Case withdrawn. All identity details protected.",
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
    safeNow: "Ṣé o wà ní ààbò báyìí?",
    safeNowSub: "Ṣé o wà nínú ewu ara ní báyìí?",
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
    regions: { Lagos: "Lágọ́ọ̀sì", Abuja: "Àbújá", Kano: "Káno", Other: "Ibòmíràn" },
    yes: "Bẹ́ẹ̀ni", no: "Rárá", notSure: "Mi ò dájú",

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
      Submitted: "A ti fi ránṣẹ́",
      "Being reviewed": "Wọ́n ń ṣe àyẹ̀wò rẹ̀",
      "Support in progress": "Ìrànlọ́wọ́ ń lọ lọ́wọ́",
      Resolved: "A ti parí rẹ̀",
      Withdrawn: "A ti yọ ọ̀ràn náà kúrò",
    },
    withdrawnMessage: "A ti yọ ọ̀ràn yìí kúrò.",
    identityFields: { Name: "Orúkọ", "Phone number": "Nọ́ńbà fóònù", "Email address": "Àdírẹ́sì imeèlì" },

    withdrawConfirm: "Ṣé o fẹ́ yọ ọ̀ràn yìí kúrò? A ó dáàbò bo ìwífún rẹ̀ lẹ́ẹ̀kansi, ìbánisọ̀rọ̀ sì máa dáwọ́ dúró. Àkíyèsí: ìwífún tí ẹni tó ń bójú tó ọ̀ràn ti rí ṣáájú yóò wà lọ́dọ̀ wọn.",
    deleteConfirm: "Ṣé o fẹ́ pa ọ̀ràn yìí rẹ́ kúrò lórí ẹ̀rọ yìí? Nínú àpẹẹrẹ yìí, ọ̀ràn náà wà lórí ẹ̀rọ yìí nìkan, nítorí náà ó máa sọnù pátápátá. Nínú ètò gidi, ọ̀ràn náà máa wà lórí server, kọ́kọ́rọ́ rẹ sì máa jẹ́ kí o padà wọlé.",

    justNow: "ní báyìí", minute: "ìṣẹ́jú", minutes: "ìṣẹ́jú", hour: "wákàtí", hours: "wákàtí", day: "ọjọ́", days: "ọjọ́", ago: "sáájú",

    timelineCaseStarted: "A bẹ̀rẹ̀ ọ̀ràn náà ní ìkọ̀kọ̀.",
    timelineCaseRouted: "A fi ọ̀ràn náà ránṣẹ́ sí {org}. {why}",
    timelineAccessApproved: "A fọwọ́ sí ìwọlé sí {fields}.",
    timelineAccessDeclined: "A kọ̀ ìbéèrè ìwọlé sí {fields}.",
    timelineAccessRevoked: "A dá ìwọlé sí {field} dúró.",
    timelineCaseWithdrawn: "A yọ ọ̀ràn náà kúrò. A dáàbò bo gbogbo ìwífún ìdánimọ̀.",
    incidentDescriptionLabel: "Àlàyé ohun tó ṣẹlẹ̀",
  },
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

const formatTime = (iso, lang = 'en') => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString(lang === 'yo' ? 'yo-NG' : 'en-NG', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

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

const secureRandomString = (len) => {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(len);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(36).padStart(2, '0')).join('').substring(0, len).toUpperCase();
  }
  // LAN Fallback for non-secure contexts
  return Array.from({ length: len }, () => Math.random().toString(36).substring(2, 3)).join('').toUpperCase();
};

const generateId = () => {
  const s = secureRandomString(8);
  return `MA-${s.substring(0, 4)}-${s.substring(4)}`;
};
const generateKey = () => {
  const s = secureRandomString(16);
  return `${s.substring(0, 4)}-${s.substring(4, 8)}-${s.substring(8, 12)}-${s.substring(12)}`;
};

const getTimestamp = () => new Date().toISOString();

const emptyPermission = () => ({ granted: false, purpose: null, grantedAt: null, expiresAt: null, revokedAt: null });

const routeToOrg = (region, category) => {
  if (category === 'Child protection') {
    return region === 'Kano'
      ? { org: 'Child Protection Kano', why: 'They handle child protection cases in Kano.' }
      : { org: 'National Crisis Line', why: 'No child protection partner in your region yet.' };
  }
  if (region === 'Lagos') return { org: 'SafeHouse Lagos', why: 'Shelter and support in Lagos.' };
  if (region === 'Abuja') return { org: 'Abuja Legal Support', why: 'Legal support in Abuja.' };
  if (category === 'Something else') return { org: 'National Crisis Line', why: 'General support line.' };
  return { org: 'GBV Response Net', why: 'Coverage where there is no local partner.' };
};

const looksIdentifying = (t) => /(\+?\d[\d\s-]{7,}\d)|@/.test(t);

const enforceResponderAccess = (caseData) => {
  if (!caseData) return null;
  const safeData = JSON.parse(JSON.stringify(caseData));
  
  // Safe defaults against malformed legacy data
  safeData.identity = safeData.identity || { name: '', phone: '', email: '' };
  safeData.permissions = safeData.permissions || {
    name: emptyPermission(), phone: emptyPermission(), email: emptyPermission(),
  };

  // Computes the existence of data prior to stripping it
  safeData.hasIdentityData = {
    name: !!safeData.identity.name,
    phone: !!safeData.identity.phone,
    email: !!safeData.identity.email,
  };

  // The actual boundary enforcement logic
  if (!safeData.permissions.name?.granted) safeData.identity.name = null;
  if (!safeData.permissions.phone?.granted) safeData.identity.phone = null;
  if (!safeData.permissions.email?.granted) safeData.identity.email = null;
  return safeData;
};

const useCases = () => {
  const [cases, setCases] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mafaka_cases')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
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
      if (migrated) {
        localStorage.setItem('mafaka_cases', JSON.stringify(raw));
        setCases(raw);
      }
    } catch (e) {}

    const handleStorage = () => setCases(JSON.parse(localStorage.getItem('mafaka_cases') || '{}'));
    window.addEventListener('storage', handleStorage);
    window.addEventListener('mafaka_update', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mafaka_update', handleStorage);
    };
  }, []);

  const updateCase = (id, updater) => {
    const current = JSON.parse(localStorage.getItem('mafaka_cases') || '{}');
    if (current[id]) {
      current[id] = updater(current[id]);
      localStorage.setItem('mafaka_cases', JSON.stringify(current));
      setCases(current);
      window.dispatchEvent(new Event('mafaka_update'));
    }
  };
  const addCase = (newCase) => {
    const current = JSON.parse(localStorage.getItem('mafaka_cases') || '{}');
    current[newCase.id] = newCase;
    localStorage.setItem('mafaka_cases', JSON.stringify(current));
    setCases(current);
    window.dispatchEvent(new Event('mafaka_update'));
  };
  return { cases, updateCase, addCase };
};

const Header = ({ onNavigate, currentView, lang, setLang, t }) => {
  const handleQuickExit = () => window.location.replace('https://www.google.com');
  return (
    <header className="bg-[#F8F6F1]/80 backdrop-blur-md border-b border-stone-200/70 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-[#3D5A4C]" strokeWidth={1.75} />
          <span className="font-serif font-medium text-xl tracking-tight text-[#1A1A1A]">MAFAKA</span>
          <span className="ml-1 text-xs font-medium tracking-wide uppercase bg-stone-200/70 text-stone-600 px-2 py-0.5 rounded-full">
            {t.prototype}
          </span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          {currentView.startsWith('responder') && (
            <span className="text-xs font-medium text-stone-500 hidden sm:inline-block tracking-wide">Responder workspace</span>
          )}
          <div className="flex items-center gap-1 text-xs font-medium mr-2">
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'en' ? 'bg-[#3D5A4C] text-white' : 'text-stone-500 hover:text-stone-800'}`}>EN</button>
            <button onClick={() => setLang('yo')} className={`px-2.5 py-1 rounded-full transition-colors ${lang === 'yo' ? 'bg-[#3D5A4C] text-white' : 'text-stone-500 hover:text-stone-800'}`}>YO</button>
          </div>
          <button onClick={handleQuickExit} title={t.quickExitTitle} className="flex items-center gap-2 text-stone-600 hover:text-[#1A1A1A] px-3 py-2 text-sm font-medium transition-colors">
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
  <div className="max-w-5xl mx-auto px-5 space-y-32 pb-24 fade-in">
    <section className="pt-20 md:pt-28 text-center max-w-3xl mx-auto">
      <h1 className="font-serif font-medium text-4xl md:text-6xl text-[#1A1A1A] leading-[1.08] tracking-tight">
        {t.tagline}
        <br />
        <span className="text-[#3D5A4C]">{t.taglineB}</span>
      </h1>
      <p className="mt-8 text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
        {t.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-10">
        <button onClick={() => onNavigate('intake')} className="w-full sm:w-auto bg-[#3D5A4C] hover:bg-[#32493E] text-white px-7 py-3.5 rounded-full font-medium text-base transition-colors flex items-center justify-center gap-2">
          {t.startPrivately} <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <button onClick={() => onNavigate('survivor_login')} className="w-full sm:w-auto border border-stone-300 hover:border-stone-400 text-stone-700 px-7 py-3.5 rounded-full font-medium text-base transition-colors bg-white/40">
          {t.alreadyHaveCase}
        </button>
      </div>
      <p className="mt-8 text-xs text-stone-500 font-normal">{t.prototypeNote}</p>
    </section>
    <section className="max-w-3xl mx-auto text-center">
      <div className="border-y border-stone-200 py-16 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6">{t.principle}</p>
        <h2 className="font-serif font-medium text-3xl md:text-5xl text-[#1A1A1A] leading-tight whitespace-pre-line" style={{ textWrap: 'balance' }}>
          {t.caseIsNotAccess}
        </h2>
        <p className="mt-8 text-lg text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">{t.principleBody}</p>
      </div>
    </section>
    <section className="max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-10 text-center">{t.howItWorks}</p>
      <div className="relative">
        <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200" />
        <div className="grid md:grid-cols-5 gap-10 md:gap-4">
          {[
            { icon: Lock, title: t.step1Title, desc: t.step1Desc },
            { icon: MessageSquare, title: t.step2Title, desc: t.step2Desc },
            { icon: ArrowRight, title: t.step3Title, desc: t.step3Desc },
            { icon: Eye, title: t.step4Title, desc: t.step4Desc },
            { icon: CheckCircle2, title: t.step5Title, desc: t.step5Desc },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-stone-300 flex items-center justify-center mb-4 relative z-10">
                <s.icon className="w-5 h-5 text-[#3D5A4C]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-lg text-[#1A1A1A] mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-stone-600 font-normal leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <footer className="pt-16 border-t border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="text-sm text-stone-500 max-w-2xl font-normal leading-relaxed">
          <strong className="text-stone-700 font-medium block mb-2">{t.footerPrincipleTitle}</strong>
          {t.footerPrincipleBody}<br /><br />{t.footerPrototypeBody}<br /><br />
          <span className="italic">{t.footerProtection}</span>
        </div>
        <button onClick={() => onNavigate('responder_login')} className="text-sm font-medium text-stone-600 hover:text-[#1A1A1A] underline underline-offset-4 decoration-stone-400">
          {t.enterResponder}
        </button>
      </div>
    </footer>
  </div>
);

const IntakeFlow = ({ onComplete, onNavigate, t }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    category: '', danger: '', dangerNearby: '', region: '', incident: '',
    identity: { name: '', phone: '', email: '' },
  });
  const [generatedCase, setGeneratedCase] = useState(null);
  const [savedKey, setSavedKey] = useState(false);
  const update = (key, val) => setData((prev) => ({ ...prev, [key]: val }));

  const safetyOptions = [
    { value: 'Yes', label: t.yes }, { value: 'No', label: t.no }, { value: 'Not sure', label: t.notSure },
  ];

  const handleSubmit = () => {
    const caseId = generateId();
    const recoveryKey = generateKey();
    const { org, why } = routeToOrg(data.region, data.category);

    const newCase = {
      id: caseId, recoveryKey, status: 'Submitted',
      category: data.category, region: data.region, org, danger: data.danger, dangerNearby: data.dangerNearby,
      incidentDescription: data.incident, identity: data.identity,
      permissions: { name: emptyPermission(), phone: emptyPermission(), email: emptyPermission() },
      requests: [], messages: [],
      timeline: [
        { id: Date.now().toString(), time: getTimestamp(), event: 'Case started privately.' },
        { id: (Date.now() + 1).toString(), time: getTimestamp(), event: `Case routed to ${org}. ${why}` },
      ],
    };
    setGeneratedCase(newCase);
    setStep(6);
  };

  if (step === 6 && generatedCase) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12 fade-in">
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 md:p-10 space-y-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#4A7C59]/10 text-[#4A7C59] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif font-medium text-3xl text-[#1A1A1A]">{t.caseOpen}</h2>
            <p className="text-stone-600 font-normal">{t.caseOpenSub}</p>
          </div>
          <div className="bg-[#F8F6F1] rounded-2xl p-6 border border-stone-200/70 space-y-6">
            <div>
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.caseNumber}</label>
              <div className="font-mono text-xl md:text-2xl font-medium text-[#1A1A1A] mt-1.5">{generatedCase.id}</div>
            </div>
            <div className="pt-4 border-t border-stone-200/70">
              <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">{t.recoveryKey}</label>
              <div className="font-mono text-xl md:text-2xl font-medium text-[#3D5A4C] mt-1.5 select-all">{generatedCase.recoveryKey}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#C68A3D]/10 border border-[#C68A3D]/30 text-stone-800 rounded-xl p-5 flex gap-3.5 text-sm leading-relaxed">
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#C68A3D] mt-0.5" strokeWidth={1.75} />
              <div>{t.saveKeyWarning}</div>
            </div>
            <div className="bg-[#A23B3B]/5 border border-[#A23B3B]/25 text-stone-800 rounded-xl p-5 flex gap-3.5 text-sm leading-relaxed">
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#A23B3B] mt-0.5" strokeWidth={1.75} />
              <div>{t.sharedPhoneWarning}</div>
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer pt-2">
            <input type="checkbox" checked={savedKey} onChange={(e) => setSavedKey(e.target.checked)} className="w-4 h-4 rounded border-stone-400 text-[#3D5A4C] focus:ring-[#3D5A4C]" />
            <span className="text-stone-700 font-normal">{t.savedKeyCheck}</span>
          </label>
          <button disabled={!savedKey} onClick={() => onComplete(generatedCase)} className="w-full bg-[#3D5A4C] disabled:bg-stone-300 disabled:cursor-not-allowed hover:bg-[#32493E] text-white py-4 rounded-full font-medium text-base transition-colors">
            {t.viewMyCase}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 md:py-14 fade-in">
      <div className="mb-10">
        <div className="text-xs font-medium text-stone-500 mb-3 tracking-wide">{t.step} {step} {t.of} 5</div>
        <div className="h-1 bg-stone-200/70 rounded-full overflow-hidden">
          <div className="h-full bg-[#3D5A4C] transition-all duration-700 ease-out" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-stone-200/80 p-7 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] fade-in">
        {step === 1 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.helpWith}</h2>
              <p className="mt-2 text-stone-600 font-normal">{t.helpWithSub}</p>
            </div>
            <div className="space-y-2.5">
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
          <div className="space-y-7">
            <div>
              <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.safeNow}</h2>
              <p className="mt-2 text-stone-600 font-normal">{t.safeNowSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {safetyOptions.map((opt) => (
                <button key={opt.value} onClick={() => update('danger', opt.value)} className={`flex-1 py-3.5 rounded-full border font-normal transition-colors ${data.danger === opt.value ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
            {(data.danger === 'Yes' || data.danger === 'Not sure') && (
              <div className="space-y-5 pt-6 border-t border-stone-100 fade-in">
                <p className="text-stone-700 font-normal">{t.dangerNearby}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {safetyOptions.map((opt) => (
                    <button key={opt.value} onClick={() => update('dangerNearby', opt.value)} className={`flex-1 py-3.5 rounded-full border font-normal transition-colors ${data.dangerNearby === opt.value ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(data.danger === 'Yes' || data.danger === 'Not sure') && data.dangerNearby !== '' && (
              <div className="bg-[#A23B3B]/5 border border-[#A23B3B]/25 rounded-2xl p-5 mt-2 flex gap-4 fade-in">
                <AlertTriangle className="w-5 h-5 text-[#A23B3B] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <h4 className="font-serif font-medium text-lg text-[#1A1A1A] mb-1">{t.safetyWarningTitle}</h4>
                  <p className="text-stone-700 text-sm leading-relaxed font-normal">{t.safetyWarningBody}</p>
                </div>
              </div>
            )}
            <div className="pt-6 flex justify-between items-center">
              <button onClick={() => setStep(1)} className="text-stone-500 hover:text-[#1A1A1A] font-normal text-sm">{t.backBtn}</button>
              <button disabled={!data.danger} onClick={() => setStep(3)} className="bg-[#3D5A4C] hover:bg-[#32493E] disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-7 py-3 rounded-full font-medium transition-colors">{t.continueBtn}</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.regionSelect}</h2>
              <p className="mt-2 text-stone-600 font-normal">{t.regionSelectSub}</p>
            </div>
            <div className="space-y-2.5">
              {['Lagos', 'Abuja', 'Kano', 'Other'].map((opt) => (
                <button key={opt} onClick={() => { update('region', opt); setStep(4); }} className="w-full text-left px-5 py-4 rounded-2xl border border-stone-200 hover:border-[#3D5A4C] hover:bg-[#3D5A4C]/5 text-stone-800 transition-all flex items-center justify-between group">
                  <span className="font-normal">{t.regions[opt]}</span>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#3D5A4C] transition-colors" strokeWidth={1.75} />
                </button>
              ))}
            </div>
            <div className="pt-2">
              <button onClick={() => setStep(2)} className="text-stone-500 hover:text-[#1A1A1A] font-normal text-sm">{t.backBtn}</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.incident}</h2>
              <p className="mt-2 text-stone-600 font-normal">{t.incidentSub}</p>
            </div>
            <div className="bg-[#C68A3D]/10 border border-[#C68A3D]/25 text-stone-800 p-4 rounded-2xl text-sm leading-relaxed flex gap-3">
              <Info className="w-4 h-4 shrink-0 text-[#C68A3D] mt-0.5" strokeWidth={1.75} />
              <div>{t.incidentNudge}</div>
            </div>
            {data.incident.trim().length > 20 && looksIdentifying(data.incident) && (
              <div className="bg-[#C68A3D]/10 border border-[#C68A3D]/25 text-stone-800 rounded-2xl p-4 flex gap-3 text-sm leading-relaxed fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#C68A3D] mt-0.5" strokeWidth={1.75} />
                <div>{t.identifyingWarning}</div>
              </div>
            )}
            <textarea aria-label={t.incidentDescriptionLabel} value={data.incident} onChange={(e) => update('incident', e.target.value)} placeholder={t.incidentPlaceholder} className="w-full h-48 p-4 border border-stone-300 rounded-2xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] resize-none font-normal text-stone-800 placeholder:text-stone-500 outline-none transition-colors" />
            <div className="pt-2 flex justify-between items-center">
              <button onClick={() => setStep(3)} className="text-stone-500 hover:text-[#1A1A1A] font-normal text-sm">{t.backBtn}</button>
              <button disabled={!data.incident.trim()} onClick={() => setStep(5)} className="bg-[#3D5A4C] hover:bg-[#32493E] disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-7 py-3 rounded-full font-medium transition-colors">{t.continueBtn}</button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-7">
            <div>
              <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.controlShare}</h2>
              <p className="mt-2 text-stone-600 font-normal leading-relaxed">{t.controlShareSub}</p>
            </div>
            <div className="space-y-4 bg-[#F8F6F1] p-6 rounded-2xl border border-stone-200/70">
              <div>
                <label htmlFor="id_name" className="block text-sm font-medium text-stone-700 mb-1.5">{t.nameLabel} <span className="text-stone-500 font-normal">{t.optional}</span></label>
                <input id="id_name" type="text" value={data.identity.name} onChange={(e) => update('identity', { ...data.identity, name: e.target.value })} className="w-full p-3 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] font-normal outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="id_phone" className="block text-sm font-medium text-stone-700 mb-1.5">{t.phoneLabel} <span className="text-stone-500 font-normal">{t.optional}</span></label>
                <input id="id_phone" type="tel" value={data.identity.phone} onChange={(e) => update('identity', { ...data.identity, phone: e.target.value })} className="w-full p-3 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] font-normal outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="id_email" className="block text-sm font-medium text-stone-700 mb-1.5">{t.emailLabel} <span className="text-stone-500 font-normal">{t.optional}</span></label>
                <input id="id_email" type="email" value={data.identity.email} onChange={(e) => update('identity', { ...data.identity, email: e.target.value })} className="w-full p-3 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#3D5A4C] focus:border-[#3D5A4C] font-normal outline-none transition-colors" />
              </div>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <button onClick={() => setStep(4)} className="text-stone-500 hover:text-[#1A1A1A] font-normal text-sm">{t.backBtn}</button>
              <button onClick={handleSubmit} className="bg-[#3D5A4C] hover:bg-[#32493E] text-white px-7 py-3.5 rounded-full font-medium transition-colors">{t.createCaseBtn}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WhatHappensNext = ({ caseData, onContinue, t }) => (
  <div className="max-w-2xl mx-auto px-5 py-12 md:py-16 fade-in">
    <div className="bg-white rounded-3xl border border-stone-200/80 p-8 md:p-10 space-y-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">{t.nextSteps}</p>
        <h2 className="font-serif font-medium text-3xl text-[#1A1A1A] leading-tight">{t.caseIsWith} {caseData.org}.</h2>
        <p className="mt-3 text-stone-600 font-normal leading-relaxed">{t.expectations}</p>
      </div>
      <div className="space-y-6">
        {[
          { title: t.next1Title, body: t.next1Body },
          { title: t.next2Title, body: t.next2Body },
          { title: t.next3Title, body: t.next3Body },
          { title: t.next4Title, body: t.next4Body },
          { title: t.next5Title, body: t.next5Body },
        ].map((s, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-[#3D5A4C]/10 text-[#3D5A4C] flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">{i + 1}</div>
            <div>
              <div className="font-medium text-[#1A1A1A] mb-1">{s.title}</div>
              <div className="text-sm text-stone-600 font-normal leading-relaxed">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onContinue} className="w-full bg-[#3D5A4C] hover:bg-[#32493E] text-white py-4 rounded-full font-medium text-base transition-colors">
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
    if (c && c.recoveryKey === key.trim().toUpperCase()) onLogin(cid);
    else setError(t.caseCredentialsError);
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
          <button type="submit" className="w-full bg-[#3D5A4C] hover:bg-[#32493E] text-white py-3.5 rounded-full font-medium transition-colors mt-2">{t.accessCase}</button>
        </form>
        <div className="text-center">
          <button onClick={() => onNavigate('home')} className="text-sm text-stone-500 hover:text-stone-800 font-normal">{t.cancel}</button>
        </div>
        <div className="text-center text-xs font-normal text-stone-500 border-t border-stone-200 pt-5">{t.demoEnvironment}</div>
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

const SurvivorDashboard = ({ caseData, updateCase, t, lang }) => {
  const [msg, setMsg] = useState('');
  if (!caseData) return null;

  const keyMap = { 'Name': 'name', 'Phone number': 'phone', 'Email address': 'email' };

  const handleRequest = (reqId, decision) => {
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      const req = newC.requests.find((r) => r.id === reqId);
      req.status = decision;
      const ts = getTimestamp();

      newC.timeline.push({
        id: Date.now().toString(),
        time: ts,
        event: decision === 'approved' ? `Access to ${req.fields.join(', ')} approved.` : `Access to ${req.fields.join(', ')} declined.`,
      });

      if (decision === 'approved') {
        req.fields.forEach((f) => {
          const k = keyMap[f];
          if (k) {
            newC.permissions[k] = { granted: true, purpose: req.reason, grantedAt: ts, expiresAt: req.expiresAt, revokedAt: null };
          }
        });
      }
      return newC;
    });
  };

  const handleRevoke = (fieldLabel) => {
    updateCase(caseData.id, (c) => {
      const newC = { ...c };
      const k = keyMap[fieldLabel];
      if (k && newC.permissions[k]) {
        newC.permissions[k].granted = false;
        newC.permissions[k].revokedAt = getTimestamp();
      }
      newC.timeline.push({
        id: Date.now().toString(),
        time: getTimestamp(),
        event: `Access to ${fieldLabel.toLowerCase()} revoked.`,
      });
      return newC;
    });
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    updateCase(caseData.id, (c) => {
      c.messages.push({ id: Date.now().toString(), text: msg, sender: 'survivor', time: getTimestamp() });
      return { ...c };
    });
    setMsg('');
  };

  const handleWithdraw = () => {
    if (!window.confirm(t.withdrawConfirm)) return;
    updateCase(caseData.id, (c) => {
      c.status = 'Withdrawn';
      c.permissions = { name: emptyPermission(), phone: emptyPermission(), email: emptyPermission() };
      c.requests = c.requests.map(r => r.status === 'pending' ? { ...r, status: 'declined' } : r);
      c.timeline.push({ id: Date.now().toString(), time: getTimestamp(), event: 'Case withdrawn. All identity details protected.' });
      return { ...c };
    });
  };

  const handleDeleteFromDevice = () => {
    if (!window.confirm(t.deleteConfirm)) return;
    const current = JSON.parse(localStorage.getItem('mafaka_cases') || '{}');
    delete current[caseData.id];
    localStorage.setItem('mafaka_cases', JSON.stringify(current));
    window.location.replace('https://www.google.com');
  };

  const statusSteps = ['Submitted', 'Being reviewed', 'Support in progress', 'Resolved'];
  const pendingRequests = caseData.requests.filter((r) => r.status === 'pending');
  const isClosed = caseData.status === 'Resolved' || caseData.status === 'Withdrawn';

  const renderPermissionState = (label, internalKey) => {
    const perm = caseData.permissions[internalKey];
    if (perm.granted) {
      return (
        <div className="flex items-start justify-between p-4 bg-white border border-stone-200/80 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-[#1A1A1A]">{label}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider bg-[#4A7C59]/10 text-[#4A7C59] px-2 py-0.5 rounded-full">{t.shared}</span>
            </div>
            <div className="text-xs text-stone-600 font-normal space-y-1">
              <div><span className="text-stone-400">{t.sharedWith}</span> {caseData.org}</div>
              <div><span className="text-stone-400">{t.purpose}</span> {perm.purpose}</div>
              {perm.expiresAt && <div><span className="text-stone-400">{t.expires}</span> {formatTime(perm.expiresAt, lang)}</div>}
            </div>
          </div>
          <button onClick={() => handleRevoke(label)} title={t.stopSharingTitle} className="text-xs font-medium text-stone-600 hover:text-[#1A1A1A] border border-stone-200 px-3 py-1.5 rounded-full hover:bg-stone-50 transition-colors">
            {t.stopFutureSharing}
          </button>
        </div>
      );
    }
    if (perm.revokedAt) {
      return (
        <div className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
          <div className="flex items-center gap-3">
            <History className="w-4 h-4 text-stone-400" />
            <span className="text-sm font-medium text-stone-600">{label}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{t.previouslyShared}</span>
          </div>
          <span className="text-xs text-stone-500 font-normal">{t.revoked} {formatTime(perm.revokedAt, lang)}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
        <div className="flex items-center gap-3">
          <Lock className="w-4 h-4 text-stone-400" />
          <span className="text-sm font-medium text-stone-600">{label}</span>
        </div>
        <span className="text-xs text-stone-500 font-normal">{t.neverShared}</span>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 fade-in">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif font-medium text-3xl text-[#1A1A1A]">{t.caseDashboard}</h1>
          <p className="text-stone-500 mt-1 font-mono text-sm">{caseData.id}</p>
        </div>
        <div className="text-sm font-medium text-stone-600 bg-white px-4 py-2 rounded-full border border-stone-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {t.assignedTo} <span className="text-[#1A1A1A]">{caseData.org}</span>
        </div>
      </div>
      {caseData.status === 'Withdrawn' ? (
        <div className="mb-10 text-center w-full text-sm text-stone-500 font-medium">{t.withdrawnMessage}</div>
      ) : (
        <div className="mb-10 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap justify-between gap-6 relative">
          <div className="absolute top-1/2 left-8 right-8 h-px bg-stone-100 -z-10" />
          {statusSteps.map((step, i) => {
            const active = statusSteps.indexOf(caseData.status) >= i;
            return (
              <div key={step} className="flex flex-col items-center gap-3 bg-white px-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-[#3D5A4C] text-white' : 'bg-stone-100 text-stone-400'}`}>
                  {active ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-stone-300" />}
                </div>
                <span className={`text-sm font-medium ${active ? 'text-[#1A1A1A]' : 'text-stone-500 font-normal'}`}>{t.statuses[step]}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="space-y-6">
        {pendingRequests.map((req) => (
          <div key={req.id} className="bg-[#C68A3D]/5 border-l-4 border-[#C68A3D] rounded-r-2xl p-6 fade-in shadow-sm">
            <div className="flex items-center gap-2 text-[#C68A3D] font-medium mb-3">
              <AlertTriangle className="w-5 h-5" /> {t.actionNeeded}
            </div>
            <p className="text-stone-800 font-medium mb-4">
              {caseData.org} {t.isRequesting} {req.fields.map(f => t.identityFields[f] || f).join(', ')}
            </p>
            <div className="space-y-2 mb-6">
              <div className="text-sm bg-white/60 p-3 rounded-lg border border-[#C68A3D]/20">
                <strong className="font-medium text-stone-900 block mb-0.5">{t.why}</strong>
                <span className="text-stone-700 font-normal">{req.reason}</span>
              </div>
              <div className="text-sm bg-white/60 p-3 rounded-lg border border-[#C68A3D]/20">
                <strong className="font-medium text-stone-900 block mb-0.5">{t.duration}</strong>
                <span className="text-stone-700 font-normal">{req.duration}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => handleRequest(req.id, 'declined')} className="flex-1 py-3 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-full font-medium transition-colors">
                {t.decline}
              </button>
              <button onClick={() => handleRequest(req.id, 'approved')} className="flex-1 py-3 bg-[#C68A3D] hover:bg-[#b07832] text-white rounded-full font-medium transition-colors shadow-sm">
                {t.allow}
              </button>
            </div>
            <p className="text-center text-xs text-stone-500 mt-4 font-normal">{t.declineNote}</p>
          </div>
        ))}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-[#F8F6F1] rounded-3xl p-6 md:p-8 border border-stone-200/70">
              <h3 className="font-serif font-medium text-lg text-[#1A1A1A] mb-5">{t.whoCanSeeWhat}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-stone-200/70">
                  <div className="flex items-center gap-3">
                    <Unlock className="w-4 h-4 text-[#3D5A4C]" />
                    <span className="text-sm font-medium text-stone-800">{t.basicCaseDetails}</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider bg-stone-200/70 text-stone-600 px-2 py-0.5 rounded-full">{t.accessible}</span>
                </div>
                {renderPermissionState(t.identityFields.Name, 'name')}
                {renderPermissionState(t.identityFields['Phone number'], 'phone')}
                {renderPermissionState(t.identityFields['Email address'], 'email')}
              </div>
              <p className="mt-6 pt-5 border-t border-stone-200/70 text-xs text-stone-500 font-normal leading-relaxed">{t.stopSharingNote}</p>
              <div className="mt-6 pt-5 flex justify-between items-center border-t border-stone-200/70">
                <button onClick={handleDeleteFromDevice} className="text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4">{t.deleteFromDevice}</button>
                {!isClosed && <button onClick={handleWithdraw} className="text-sm text-[#A23B3B] hover:text-[#802f2f] font-medium flex items-center gap-1"><XCircle className="w-4 h-4" /> {t.withdrawCase}</button>}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-medium text-lg text-[#1A1A1A]">{t.messages}</h3>
                <span className="text-xs font-normal text-stone-500 bg-stone-100 px-2 py-1 rounded-md">{t.notEncrypted}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {caseData.messages.length === 0 ? (
                  <div className="text-center text-stone-500 text-sm font-normal mt-10">{t.noMessages}</div>
                ) : (
                  caseData.messages.map((m) => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'survivor' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-normal ${m.sender === 'survivor' ? 'bg-[#3D5A4C] text-white rounded-br-sm' : 'bg-[#F8F6F1] border border-stone-200/70 text-stone-800 rounded-bl-sm'}`}>
                        {m.text}
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1.5 font-normal mx-1">{humanTimeAgo(m.time, t)}</span>
                    </div>
                  ))
                )}
              </div>
              {isClosed ? (
                <div className="text-center p-3 text-stone-500 text-sm font-normal bg-stone-50 rounded-xl mt-4">
                  {interpolate(t.communicationClosed, { status: t.statuses[caseData.status]?.toLowerCase() || caseData.status })}
                </div>
              ) : (
                <form onSubmit={handleSendMsg} className="mt-4 relative">
                  <input aria-label={t.messageInputLabel} type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.typeMessage} className="w-full pl-4 pr-12 py-3 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#3D5A4C] font-normal placeholder:text-stone-400" />
                  <button type="submit" disabled={!msg.trim()} className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 bg-[#3D5A4C] text-white rounded-full flex items-center justify-center disabled:bg-stone-300 transition-colors">
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <Timeline events={caseData.timeline} t={t} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ResponderLogin = ({ onLogin, onNavigate }) => {
  const [org, setOrg] = useState('SafeHouse Lagos');
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#1A1A1A] flex items-center justify-center px-5 fade-in">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 md:p-10 text-stone-200 shadow-2xl">
        <div className="flex items-center gap-2.5 mb-8">
          <Shield className="w-5 h-5 text-stone-400" strokeWidth={1.75} />
          <span className="font-serif font-medium text-xl tracking-tight text-white">MAFAKA</span>
          <span className="ml-1 text-xs font-medium tracking-wide uppercase bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full">
            Responder
          </span>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-medium text-white mb-2">Prototype responder workspace</h2>
          <p className="text-sm text-stone-400 font-normal leading-relaxed">Organisational verification and authentication would be handled by the production backend.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-400 mb-2">Select demo organisation</label>
            <select value={org} onChange={(e) => setOrg(e.target.value)} className="w-full bg-stone-800 border border-stone-700 text-white p-3.5 rounded-xl outline-none focus:border-stone-500 transition-colors appearance-none font-normal">
              <option>SafeHouse Lagos</option>
              <option>Abuja Legal Support</option>
              <option>Child Protection Kano</option>
              <option>National Crisis Line</option>
              <option>GBV Response Net</option>
            </select>
          </div>
          <button onClick={() => onLogin(org)} className="w-full bg-white hover:bg-stone-200 text-[#1A1A1A] py-3.5 rounded-xl font-medium transition-colors mt-2">
            Enter workspace
          </button>
          <button onClick={() => onNavigate('home')} className="w-full py-3.5 text-stone-400 hover:text-white font-normal text-sm transition-colors">
            Return to main site
          </button>
        </div>
      </div>
    </div>
  );
};

const ResponderDashboard = ({ cases, activeOrg, onOpenCase, onLogout }) => {
  const myCases = Object.values(cases).filter((c) => c.org === activeOrg).sort((a, b) => {
    const aUrgent = a.danger === 'Yes' || a.danger === 'Not sure' ? 1 : 0;
    const bUrgent = b.danger === 'Yes' || b.danger === 'Not sure' ? 1 : 0;
    return bUrgent - aUrgent;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-stone-50 px-5 py-10 fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-stone-900">{activeOrg}</h1>
            <p className="text-sm text-stone-500 font-normal mt-1">Assigned queue ({myCases.length} cases)</p>
          </div>
          <button onClick={onLogout} className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
            Log out demo
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Case ID</th>
                  <th className="px-6 py-4 font-medium">Urgency</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Region</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {myCases.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-stone-500 font-normal">No cases assigned to this organisation.</td></tr>
                ) : (
                  myCases.map((c) => {
                    const isUrgent = c.danger === 'Yes' || c.danger === 'Not sure';
                    return (
                      <tr key={c.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-stone-900">{c.id}</td>
                        <td className="px-6 py-4">
                          {isUrgent ? <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#A23B3B]/10 text-[#A23B3B] uppercase tracking-wide">Urgent</span> : <span className="text-stone-400 font-normal">—</span>}
                        </td>
                        <td className="px-6 py-4 text-stone-600 font-normal">{c.category}</td>
                        <td className="px-6 py-4 text-stone-600 font-normal">{c.region}</td>
                        <td className="px-6 py-4 text-stone-600 font-normal">{c.status}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => onOpenCase(c.id)} className="text-sm font-medium text-[#3D5A4C] hover:text-[#2a3f35] bg-[#3D5A4C]/10 px-4 py-1.5 rounded-lg transition-colors">
                            Open
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResponderCaseView = ({ caseData, onBack, updateCase }) => {
  const [requestFields, setRequestFields] = useState([]);
  const [requestReason, setRequestReason] = useState('');
  const [msg, setMsg] = useState('');

  if (!caseData) return null;
  const isClosed = caseData.status === 'Resolved' || caseData.status === 'Withdrawn';

  const handleStatusChange = (e) => {
    const val = e.target.value;
    updateCase(caseData.id, (c) => {
      c.status = val;
      c.timeline.push({ id: Date.now().toString(), time: getTimestamp(), event: `${c.org} changed status to: ${val}` });
      return { ...c };
    });
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    updateCase(caseData.id, (c) => {
      c.messages.push({ id: Date.now().toString(), text: msg, sender: 'responder', time: getTimestamp() });
      return { ...c };
    });
    setMsg('');
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

  const toggleReqField = (f) => setRequestFields((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const handleRequestAccess = () => {
    if (requestFields.length === 0 || !requestReason.trim()) return;
    const ts = getTimestamp();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    updateCase(caseData.id, (c) => {
      c.requests.push({ id: Date.now().toString(), fields: requestFields, reason: requestReason, status: 'pending', requestedAt: ts, expiresAt: expires, duration: '24 hours' });
      c.timeline.push({ id: (Date.now() + 1).toString(), time: ts, event: `${c.org} requested access to: ${requestFields.join(', ')}.` });
      return { ...c };
    });
    setRequestFields([]);
    setRequestReason('');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-stone-50 px-5 py-8 fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-sm font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors">
            ← Back to queue
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-stone-500">Update status:</span>
            <select value={caseData.status} onChange={handleStatusChange} disabled={caseData.status === 'Withdrawn'} className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 bg-white font-medium outline-none focus:border-stone-400">
              <option value="Submitted">Submitted</option>
              <option value="Being reviewed">Being reviewed</option>
              <option value="Support in progress">Support in progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Withdrawn" disabled>Withdrawn</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1">Case Information</div>
            <h1 className="text-2xl font-mono font-medium text-stone-900">{caseData.id}</h1>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1">Category</div>
              <div className="text-sm font-medium text-stone-800">{caseData.category}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1">Region</div>
              <div className="text-sm font-medium text-stone-800">{caseData.region}</div>
            </div>
          </div>
        </div>

        {(caseData.danger === 'Yes' || caseData.danger === 'Not sure') && (
          <div className="bg-[#A23B3B]/5 border border-[#A23B3B]/25 rounded-2xl p-5 text-sm text-stone-800">
            <strong className="font-medium">Reported possible immediate danger.</strong>{' '}
            Immediate danger: {caseData.danger}. Person causing harm nearby: {caseData.dangerNearby || 'not answered'}.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8">
              <h3 className="font-serif font-medium text-lg text-stone-900 mb-4">Incident summary</h3>
              <p className="text-sm text-stone-700 font-normal leading-relaxed whitespace-pre-wrap">{caseData.incidentDescription}</p>
            </div>
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8">
              <h3 className="font-serif font-medium text-lg text-stone-900 mb-5">Information Available</h3>
              <div className="space-y-3 mb-8">
                {[
                  { key: 'name', label: 'Name', objKey: 'Name' },
                  { key: 'phone', label: 'Phone number', objKey: 'Phone number' },
                  { key: 'email', label: 'Email address', objKey: 'Email address' },
                ].map((f) => {
                  const status = getFieldStatus(f.key);
                  const hasData = caseData.hasIdentityData[f.key];
                  return (
                    <div key={f.key} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                      <span className="text-sm font-medium text-stone-700">{f.label}</span>
                      {!hasData ? (
                        <span className="text-xs font-medium text-stone-400 px-2 py-1 bg-stone-50 rounded">Not provided</span>
                      ) : status === 'approved' ? (
                        <div className="text-right">
                          <span className="text-sm font-medium text-stone-900 block">{caseData.identity[f.key]}</span>
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-[#4A7C59]">✓ Approved</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5">
                              Granted {humanTimeAgo(caseData.permissions[f.key]?.grantedAt, STRINGS.en)}
                            </span>
                          </div>
                        </div>
                      ) : status === 'pending' ? (
                        <span className="text-xs font-medium text-[#C68A3D] px-2 py-1 bg-[#C68A3D]/10 rounded flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Request pending</span>
                      ) : status === 'declined' ? (
                        <span className="text-xs font-medium text-stone-500 px-2 py-1 bg-stone-100 rounded flex items-center gap-1"><XCircle className="w-3 h-3" /> Declined</span>
                      ) : (
                        <span className="text-xs font-medium text-stone-500 px-2 py-1 bg-stone-100 rounded flex items-center gap-1"><Lock className="w-3 h-3" /> Protected</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {!isClosed && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                  <h4 className="text-sm font-medium text-stone-900 mb-3">Request additional info</h4>
                  <div className="flex gap-3 mb-4">
                    {[
                      { key: 'name', label: 'Name', objKey: 'Name' },
                      { key: 'phone', label: 'Phone', objKey: 'Phone number' },
                      { key: 'email', label: 'Email', objKey: 'Email address' }
                    ].filter(f => caseData.hasIdentityData[f.key] && ['protected', 'declined'].includes(getFieldStatus(f.key))).map(f => (
                      <label key={f.key} className="flex items-center gap-2 text-sm text-stone-700 font-normal cursor-pointer">
                        <input type="checkbox" checked={requestFields.includes(f.objKey)} onChange={() => toggleReqField(f.objKey)} className="w-3.5 h-3.5 rounded-sm border-stone-400 text-stone-900 focus:ring-stone-900" />
                        {f.label}
                      </label>
                    ))}
                  </div>
                  {requestFields.length > 0 && (
                    <div className="space-y-3 fade-in">
                      <input type="text" placeholder="Why do you need this?" value={requestReason} onChange={(e) => setRequestReason(e.target.value)} className="w-full text-sm p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500 font-normal" />
                      <button disabled={!requestReason.trim()} onClick={handleRequestAccess} className="w-full text-sm font-medium bg-stone-900 text-white disabled:bg-stone-300 py-2.5 rounded-lg transition-colors">
                        Request access
                      </button>
                    </div>
                  )}
                  {Object.keys(caseData.hasIdentityData).every(k => !caseData.hasIdentityData[k] || getFieldStatus(k) === 'approved' || getFieldStatus(k) === 'pending') && (
                    <div className="text-xs text-stone-500 font-normal">No further information available to request.</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8 flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-medium text-lg text-stone-900">Messages</h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {caseData.messages.length === 0 ? (
                  <div className="text-center text-stone-500 text-sm font-normal mt-10">No messages yet.</div>
                ) : (
                  caseData.messages.map((m) => (
                    <div key={m.id} className={`flex flex-col ${m.sender === 'responder' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-normal ${m.sender === 'responder' ? 'bg-stone-800 text-white rounded-br-sm' : 'bg-stone-100 text-stone-800 rounded-bl-sm'}`}>
                        {m.text}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1.5 font-normal mx-1">{new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))
                )}
              </div>
              {isClosed ? (
                <div className="text-center p-3 text-stone-500 text-sm font-normal bg-stone-50 rounded-xl mt-4">Case {caseData.status.toLowerCase()}. Communication closed.</div>
              ) : (
                <form onSubmit={handleSendMsg} className="mt-4 relative">
                  <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type a message..." className="w-full pl-4 pr-12 py-3 bg-white border border-stone-300 rounded-full focus:outline-none focus:border-stone-500 font-normal text-sm" />
                  <button type="submit" disabled={!msg.trim()} className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 bg-stone-800 text-white rounded-full flex items-center justify-center disabled:bg-stone-300 transition-colors">
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-6 md:p-8">
              <Timeline events={caseData.timeline} t={STRINGS.en} lang="en" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [activeCaseId, setActiveCaseId] = useState(null);
  const [activeOrg, setActiveOrg] = useState(null);
  const [lang, setLang] = useState('en');
  const [isExited, setIsExited] = useState(false);
  const { cases, updateCase, addCase } = useCases();
  const t = STRINGS[lang];

  useEffect(() => {
    let last = 0;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      const now = Date.now();
      if (now - last < 800) window.location.replace('https://www.google.com');
      last = now;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (isExited) return <div className="fixed inset-0 bg-[#F8F6F1] z-[9999]" />;

  const navigate = (v) => { setView(v); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen bg-[#F8F6F1] font-sans selection:bg-[#3D5A4C]/20 text-[#1A1A1A]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;500&family=Inter:wght@300;400;500&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Fraunces', serif; }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Header onNavigate={navigate} currentView={view} lang={lang} setLang={setLang} t={t} />
      <main>
        {view === 'home' && <LandingView onNavigate={navigate} t={t} />}
        {view === 'intake' && <IntakeFlow onComplete={(nc) => { addCase(nc); setActiveCaseId(nc.id); navigate('whats_next'); }} onNavigate={navigate} t={t} />}
        {view === 'whats_next' && cases[activeCaseId] && <WhatHappensNext caseData={cases[activeCaseId]} onContinue={() => navigate('survivor_dashboard')} t={t} />}
        {view === 'survivor_login' && <SurvivorLogin cases={cases} onLogin={(id) => { setActiveCaseId(id); navigate('survivor_dashboard'); }} onNavigate={navigate} t={t} />}
        {view === 'survivor_dashboard' && <SurvivorDashboard caseData={cases[activeCaseId]} updateCase={updateCase} t={t} lang={lang} />}
        {view === 'responder_login' && <ResponderLogin onLogin={(org) => { setActiveOrg(org); navigate('responder_dashboard'); }} onNavigate={navigate} />}
        
        {/* We apply the physical boundary (enforceResponderAccess) so the responder dashboard list never accesses protected identities. */}
        {view === 'responder_dashboard' && (
          <ResponderDashboard 
            cases={Object.fromEntries(
              Object.entries(cases).map(([id, c]) => [id, enforceResponderAccess(c)])
            )} 
            activeOrg={activeOrg} 
            onOpenCase={(id) => { setActiveCaseId(id); navigate('responder_case'); }} 
            onLogout={() => navigate('home')} 
          />
        )}
        {view === 'responder_case' && <ResponderCaseView caseData={enforceResponderAccess(cases[activeCaseId])} updateCase={updateCase} onBack={() => navigate('responder_dashboard')} />}
      </main>
    </div>
  );
}