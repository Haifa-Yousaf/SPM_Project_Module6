import { useState } from "react";

// ─── THEME ───────────────────────────────────────────────────
const LIGHT = {
  bg: "#f9f9ff", surface: "#fff", surfaceContainer: "#f0f3ff",
  border: "#e7eeff", borderStrong: "#c4c6d0",
  text: "#001736", textSub: "#64748b", textMuted: "#94a3b8",
  primary: "#001736", primaryText: "#fff",
  accent: "#405f91", accentBg: "#d6e3ff",
  teal: "#2ca397", tealBg: "#e7fffe",
  inputBg: "#f0f3ff", sidebarBg: "linear-gradient(180deg,#f0f3ff 0%,#f9f9ff 100%)",
  navBg: "#001736", navText: "#fff",
  bubble: "#001736", bubbleText: "#fff",
  otherBubble: "#fff", otherBubbleText: "#111c2d",
};
const DARK = {
  bg: "#0d1b2a", surface: "#001736", surfaceContainer: "#002b5b",
  border: "#264778", borderStrong: "#405f91",
  text: "#ecf1ff", textSub: "#a9c7ff", textMuted: "#515f74",
  primary: "#a9c7ff", primaryText: "#001736",
  accent: "#a9c7ff", accentBg: "#264778",
  teal: "#6bd8cb", tealBg: "#00322d",
  inputBg: "#002b5b", sidebarBg: "linear-gradient(180deg,#001736 0%,#0d1b2a 100%)",
  navBg: "#0d1b2a", navText: "#ecf1ff",
  bubble: "#264778", bubbleText: "#ecf1ff",
  otherBubble: "#002b5b", otherBubbleText: "#ecf1ff",
};

// ─── SHARED DATA ─────────────────────────────────────────────
const ALL_CONTACTS = [
  { id: 1, name: "Sarah Johnson",      role: "UI/UX Designer",    online: true,  email: "sarah.j@nexuspro.com",    chatted: true  },
  { id: 2, name: "Tech Solutions Inc.",role: "Client",             online: true,  email: "info@techsolutions.com",  chatted: true  },
  { id: 3, name: "Marcus Thorne",      role: "Senior Architect",   online: false, email: "m.thorne@nexuspro.com",   chatted: true  },
  { id: 4, name: "Lisa Park",          role: "Frontend Dev",       online: true,  email: "lisa.p@nexuspro.com",     chatted: true  },
  { id: 5, name: "Omar Khalid",        role: "Project Manager",    online: false, email: "omar.k@nexuspro.com",     chatted: false },
  { id: 6, name: "Riya Mehta",         role: "Backend Dev",        online: true,  email: "riya.m@nexuspro.com",     chatted: false },
  { id: 7, name: "Dev Singh",          role: "DevOps Engineer",    online: false, email: "dev.s@nexuspro.com",      chatted: false },
  { id: 8, name: "Ahmed Khan",         role: "Team Lead",          online: true,  email: "ahmed.k@nexuspro.com",    chatted: false },
];

const memberColors = ["#405f91","#2ca397","#264778","#515f74","#005049","#264778","#405f91","#2ca397"];

const INIT_MSGS = {
  1: [
    { id:1, from:"Sarah Johnson", text:"Hey! Can you review the latest UI mockups?", time:"10:15 AM", mine:false, type:"text" },
    { id:2, from:"me", text:"Of course! I'll check them out now.", time:"10:17 AM", mine:true, status:"read", type:"text" },
    { id:3, from:"Sarah Johnson", text:"They're in the shared folder. Let me know about the colour palette.", time:"10:18 AM", mine:false, type:"text" },
    { id:4, from:"me", text:"The teal accents look very on-brand. Really like the direction 👌", time:"10:22 AM", mine:true, status:"read", type:"text" },
    { id:5, from:"Sarah Johnson", text:"Can you review the latest mockups?", time:"10:45 AM", mine:false, type:"text" },
  ],
  2: [
    { id:1, from:"Tech Solutions Inc.", text:"The project proposal looks great!", time:"9:00 AM", mine:false, type:"text" },
    { id:2, from:"me", text:"Thank you! We're confident we can deliver on schedule.", time:"9:05 AM", mine:true, status:"read", type:"text" },
  ],
  3: [
    { id:1, from:"Marcus Thorne", text:"Sent an attachment", time:"8:00 AM", mine:false, type:"file", fileName:"wireframes_v3.pdf" },
  ],
  4: [],
};

const SHARED_FILES = {
  1: [
    { id:1, name:"mockup_v2.png",    type:"image", size:"1.1 MB",  sender:"Sarah Johnson", time:"4h ago",   icon:"image",          color:"#405f91", bg:"#d6e3ff" },
    { id:2, name:"design_brief.pdf", type:"pdf",   size:"847 KB",  sender:"me",            time:"1d ago",   icon:"picture_as_pdf",  color:"#ba1a1a", bg:"#ffdad6" },
  ],
  2: [
    { id:1, name:"proposal.pdf",     type:"pdf",   size:"2.1 MB",  sender:"Tech Solutions Inc.", time:"2d ago",  icon:"picture_as_pdf",  color:"#ba1a1a", bg:"#ffdad6" },
  ],
  3: [
    { id:1, name:"wireframes_v3.pdf",type:"pdf",   size:"2.4 MB",  sender:"Marcus Thorne", time:"2h ago",   icon:"picture_as_pdf",  color:"#ba1a1a", bg:"#ffdad6" },
    { id:2, name:"architecture.png", type:"image", size:"3.2 MB",  sender:"me",            time:"3d ago",   icon:"image",           color:"#405f91", bg:"#d6e3ff" },
  ],
};

const INIT_GROUPS = [
  { id:"g1", name:"Dev Team Alpha",  members:[1,3,4,5,6,7,8], adminId:8, color:"#405f91", unread:5, lastMsg:"Ahmed: Sprint review at 3pm", time:"1h ago",  isGroup:true },
  { id:"g2", name:"Project Gamma",   members:[1,2,3,4,5],     adminId:3, color:"#2ca397", unread:0, lastMsg:"You: Will finalize by EOD",   time:"3h ago",  isGroup:true },
  { id:"g3", name:"Design Squad",    members:[1,4,6],          adminId:1, color:"#264778", unread:2, lastMsg:"Sara: New mockups uploaded",  time:"5h ago",  isGroup:true },
  { id:"g4", name:"QA Team",         members:[5,6,7,8],        adminId:5, color:"#515f74", unread:0, lastMsg:"All tests passed ✓",          time:"1d ago",  isGroup:true },
];

const GROUP_MSGS = {
  g1: [
    { id:1, from:"Ahmed K.", text:"Morning team! Standup in 10 mins.", time:"9:00 AM", mine:false, role:"admin" },
    { id:2, from:"Lisa P.",  text:"Ready! Working on the auth module", time:"9:02 AM", mine:false, role:"member" },
    { id:3, from:"me",       text:"On it! Will share PR link shortly.", time:"9:05 AM", mine:true  },
    { id:4, from:"Ahmed K.", text:"Sprint review at 3pm everyone 🙏",   time:"10:00 AM",mine:false, role:"admin" },
  ],
  g2: [
    { id:1, from:"me", text:"Will finalize by EOD", time:"3h ago", mine:true },
  ],
};

const ALL_NOTIFS_INIT = [
  { id:1, type:"message", icon:"chat",            color:"#405f91", bg:"#d6e3ff", title:"New message from Sarah Johnson",      body:"Can you review the latest mockups?",           time:"2 min ago",  read:false },
  { id:2, type:"group",   icon:"group",           color:"#264778", bg:"#e7eeff", title:"Dev Team Alpha activity",             body:"Ahmed added a new file to the group",          time:"15 min ago", read:false },
  { id:3, type:"meeting", icon:"video_call",      color:"#2ca397", bg:"#e7fffe", title:"Meeting Reminder",                    body:"Sprint Review starts in 30 minutes via Zoom",  time:"30 min ago", read:false },
  { id:4, type:"message", icon:"chat",            color:"#405f91", bg:"#d6e3ff", title:"Message from Tech Solutions Inc.",    body:"The project proposal looks great!",            time:"1 hour ago", read:true  },
  { id:5, type:"file",    icon:"upload_file",     color:"#515f74", bg:"#dee8ff", title:"File received",                       body:"Marcus Thorne shared wireframes_v3.pdf",       time:"2 hours ago",read:true  },
  { id:6, type:"meeting", icon:"video_call",      color:"#2ca397", bg:"#e7fffe", title:"Meeting completed",                   body:"Client onboarding session ended",              time:"3 hours ago",read:true  },
  { id:7, type:"group",   icon:"group",           color:"#264778", bg:"#e7eeff", title:"Added to Project Gamma",              body:"Omar Khalid added you to the group",           time:"Yesterday",  read:true  },
];

const MEETINGS_DATA = [
  { id:1, title:"Sprint Review",        date:"Today",     time:"3:00 PM",  platform:"Zoom",        participants:["AK","LP","ST"],     status:"upcoming",  link:"https://zoom.us/j/abc123" },
  { id:2, title:"Client Onboarding",    date:"Tomorrow",  time:"10:00 AM", platform:"Google Meet", participants:["MT","SJ","RN"],     status:"upcoming",  link:"https://meet.google.com/xyz-abc" },
  { id:3, title:"Design Review",        date:"Apr 25",    time:"2:00 PM",  platform:"Zoom",        participants:["SJ","LP"],          status:"scheduled", link:"https://zoom.us/j/def456" },
  { id:4, title:"Weekly Standup",       date:"Apr 24",    time:"9:30 AM",  platform:"Google Meet", participants:["AK","MT","RN","LP"],status:"scheduled", link:"https://meet.google.com/uvw-xyz" },
  { id:5, title:"Project Kickoff",      date:"Apr 20",    time:"11:00 AM", platform:"Zoom",        participants:["MT","SJ"],          status:"completed", link:"" },
  { id:6, title:"Architecture Planning",date:"Apr 18",    time:"4:00 PM",  platform:"Google Meet", participants:["AK","MT","LP"],     status:"completed", link:"" },
];

// ─── GOOGLE FONTS STYLE ──────────────────────────────────────
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
  .msi { font-family:'Material Symbols Outlined'; font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; font-size:20px; display:inline-block; vertical-align:middle; line-height:1; user-select:none; }
  .msi.fill { font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24; }
  * { box-sizing:border-box; } body { margin:0; }
  ::-webkit-scrollbar{width:4px;height:4px;} ::-webkit-scrollbar-thumb{background:#c4c6d0;border-radius:9999px;}
  input,select,textarea{font-family:'Inter',sans-serif;}
`;

// ─── AVATAR ──────────────────────────────────────────────────
function Avatar({ name, size = 38, idx = 0, isGroup = false }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 4, background: isGroup ? memberColors[idx % memberColors.length] : `linear-gradient(135deg,${memberColors[idx % memberColors.length]},#6bd8cb)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope',sans-serif", fontWeight: 800, color: "#fff", fontSize: size * 0.37, flexShrink: 0 }}>
      {isGroup ? <span className="msi fill" style={{ fontSize: size * 0.55, color: "#fff" }}>group</span> : name[0]}
    </div>
  );
}

// ─── LAYOUT ──────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "messages",  icon: "chat",          label: "Messages", badge: 5 },
  { id: "meetings",  icon: "video_call",    label: "Meetings" },
  { id: "alerts",    icon: "notifications", label: "Alerts",   badge: 3 },
];

function Layout({ children, navigate, page, T, darkMode, setDarkMode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif", background: T.bg }}>
      <style>{FONTS}</style>

      {/* TOP HEADER — blue theme, search only */}
      <header style={{ height: 56, background: T.navBg, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, position: "sticky", top: 0, zIndex: 50, flexShrink: 0, borderBottom: `1px solid rgba(169,199,255,0.12)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.09em", lineHeight: 1 }}>Header</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#6bd8cb", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 1 }}>Communication Hub</div>
        </div>
        <div style={{ flex: 1, maxWidth: 400, margin: "0 auto", position: "relative" }}>
          <input placeholder="Header Search bar…" style={{ width: "100%", background: "rgba(169,199,255,0.1)", color: "#fff", fontSize: 12, padding: "7px 14px 7px 36px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", outline: "none" }} />
          <span className="msi" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 16 }}>search</span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR — Messages, Meetings, Alerts only */}
        <aside style={{ width: 220, background: T.sidebarBg, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: 14, position: "sticky", top: 56, height: "calc(100vh - 56px)", flexShrink: 0, overflowY: "auto" }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 10, paddingLeft: 10 }}>Navigation</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            {NAV_ITEMS.map(item => {
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, background: active ? T.surface : "transparent", color: active ? T.text : T.textSub, boxShadow: active ? "0 1px 4px rgba(0,23,54,0.08)" : "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}>
                  <span className={`msi${active ? " fill" : ""}`} style={{ fontSize: 18, color: active ? "#6bd8cb" : "inherit" }}>{item.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ background: item.id === "alerts" ? "#ba1a1a" : "#405f91", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 9999 }}>{item.badge}</span>}
                </button>
              );
            })}
          </div>
          {/* Settings at bottom with dark mode toggle */}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, marginTop: 10 }}>
            <button onClick={() => setDarkMode(d => !d)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", background: "none", border: "none", color: T.textSub, cursor: "pointer", borderRadius: 8, width: "100%", transition: "all 0.15s" }}>
              <span className="msi" style={{ fontSize: 18 }}>{darkMode ? "light_mode" : "dark_mode"}</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", background: "none", border: "none", color: T.textSub, cursor: "pointer", borderRadius: 8, width: "100%" }}>
              <span className="msi" style={{ fontSize: 18 }}>contact_support</span>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Support</span>
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, overflowY: "auto", background: T.bg }}>{children}</main>
      </div>
    </div>
  );
}

// ─── BACK BUTTON ─────────────────────────────────────────────
function BackBtn({ onClick, T }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.textSub, padding: "6px 0", marginBottom: 12, fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600 }}>
      <span className="msi" style={{ fontSize: 18 }}>arrow_back</span>Back
    </button>
  );
}

// ─── FILE UPLOAD POPUP ───────────────────────────────────────
function FileUploadPopup({ onClose, T , sendMessage}) {
  const types = [
    { label: "Image", sub: "PNG, JPEG, GIF, WEBP", icon: "image", accept: ".png,.jpg,.jpeg,.gif,.webp" },
    { label: "Video", sub: "MP4, MOV, AVI",        icon: "video_file", accept: ".mp4,.mov,.avi" },
    { label: "Document",sub:"PDF, DOCX, XLSX, TXT", icon: "description", accept: ".pdf,.docx,.xlsx,.txt" },
  ];
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Uploading started...");
      const res = await fetch("http://localhost:3000/media/upload", {
        method: "POST",
        body: formData,
      });
      console.log("Response received:", res);
      const data = await res.json();

      console.log("Uploaded:", data);

      //  Send to chat system
      if (sendMessage) {
        sendMessage({
          content: data.fileUrl,
          type: data.type,
        });
      }

      // close popup after upload
      onClose();

    } 
    catch (err) {
      console.error("Upload failed", err);
    }
  };
  return (
    <div style={{ position: "absolute", bottom: 70, left: 16, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, boxShadow: "0 8px 24px rgba(0,23,54,0.12)", zIndex: 20, width: 260 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 13, color: T.text }}>Share File</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted }}><span className="msi" style={{ fontSize: 16 }}>close</span></button>
      </div>
      {types.map(t => (
        <label key={t.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: T.inputBg, marginBottom: 8, cursor: "pointer" }}>
          <span className="msi" style={{ color: "#405f91", fontSize: 20 }}>{t.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: T.text }}>{t.label}</div>
            <div style={{ fontSize: 10, color: T.textMuted }}>{t.sub}</div>
          </div>
          <input type="file" accept={t.accept} style={{ display: "none" }} onChange={handleFileChange} />
        </label>
      ))}
    </div>
  );
}

// ─── MESSAGES PAGE (overview + individual + groups merged) ───
function MessagesPage({ navigate, T }) {
  // sub-views: "summary" | "chat" | "new_message" | "create_group_step1" | "create_group_step2" | "profile" | "media"
  const [view, setView]           = useState("summary");
  const [selContact, setSelContact] = useState(null);
  const [selGroup, setSelGroup]   = useState(null);
  const [msgs, setMsgs]           = useState(INIT_MSGS);
  const [groupMsgs, setGroupMsgs] = useState(GROUP_MSGS);
  const [groups, setGroups]       = useState(INIT_GROUPS);
  const [input, setInput]         = useState("");
  const [showFilePopup, setShowFilePopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  // new message
  const [newMsgSearch, setNewMsgSearch] = useState("");

  // create group
  const [groupStep1Selected, setGroupStep1Selected] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  // add member to group (only admin)
  const [showAddMember, setShowAddMember] = useState(false);

  const isMyAdmin = selGroup && selGroup.adminId === 3; // current user id is 3 (Marcus = example; just use id 99 = "me")
  // (for demo purposes, let's make the current user be "me" with id 99 — admin of groups they created)

  const allConversations = [
    ...ALL_CONTACTS.filter(c => c.chatted).map(c => ({
      ...c,
      isGroup: false,
      lastMsg: (msgs[c.id] || []).slice(-1)[0]?.text || "",
      unread: c.id === 1 ? 3 : c.id === 2 ? 1 : 0,
    })),
    ...groups.map(g => ({
      ...g,
      id: g.id,
      name: g.name,
      online: false,
    })),
  ];

  const sendMsg = () => {
    if (!input.trim()) return;
    const m = { id: Date.now(), from: "me", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), mine: true, status: "sent", type: "text" };
    if (selGroup) {
      setGroupMsgs(p => ({ ...p, [selGroup.id]: [...(p[selGroup.id] || []), m] }));
    } else if (selContact) {
      setMsgs(p => ({ ...p, [selContact.id]: [...(p[selContact.id] || []), m] }));
    }
    setInput("");
  };

  const deleteChat = () => {
    if (selContact) setMsgs(p => ({ ...p, [selContact.id]: [] }));
    setShowDeleteConfirm(false);
  };

  const handleGroupStep1Toggle = (id) => {
    setGroupStep1Selected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const createGroup = () => {
    if (!newGroupName.trim() || groupStep1Selected.length < 1) return;
    const newG = {
      id: "g" + Date.now(),
      name: newGroupName.trim(),
      members: groupStep1Selected,
      adminId: 99,
      color: memberColors[groups.length % memberColors.length],
      unread: 0,
      lastMsg: "Group created",
      time: "Just now",
      isGroup: true,
    };
    setGroups(p => [newG, ...p]);
    setNewGroupName("");
    setGroupStep1Selected([]);
    setView("summary");
  };

  const nonGroupMembers = selGroup
    ? ALL_CONTACTS.filter(c => !selGroup.members.includes(c.id))
    : [];

  const addMemberToGroup = (contactId) => {
    setGroups(prev => prev.map(g => g.id === selGroup.id ? { ...g, members: [...g.members, contactId] } : g));
    setSelGroup(prev => ({ ...prev, members: [...prev.members, contactId] }));
    setShowAddMember(false);
  };

  // ── SUMMARY VIEW ──────────────────────────────────────────
  if (view === "summary") {
    return (
      <div style={{ padding: "32px 40px", maxWidth: 1100 }}>
        <div style={{ marginBottom: 28 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.1em" }}></span>
          <h2 style={{ fontFamily: "'Manrope',sans-serif", fontSize: 26, fontWeight: 800, color: T.text, margin: "4px 0 4px", letterSpacing: "-0.02em" }}>Messages</h2>
          <p style={{ fontSize: 12, color: T.textSub, margin: 0 }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              })}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Active Chats",     val: "24",  icon: "chat_bubble",          c: "#405f91", bg: "#d6e3ff" },
            { label: "Unread Messages",  val: "87",  icon: "mark_unread_chat_alt", c: "#ba1a1a", bg: "#ffdad6" },
            { label: "Files Shared",     val: "156", icon: "folder_shared",        c: "#005049", bg: "#89f5e7" },
            { label: "Meetings",         val: "12",  icon: "video_call",           c: "#264778", bg: "#a9c7ff" },
          ].map(s => (
            <div key={s.label} style={{ background: T.surface, borderRadius: 12, padding: 18, border: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="msi" style={{ color: s.c, fontSize: 20 }}>{s.icon}</span>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>This Week</span>
              </div>
              <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 30, fontWeight: 800, color: T.text, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.textSub, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions — NO Share File */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {[
            { l: "New Message",   i: "edit",      action: () => setView("new_message") },
            { l: "Create Group",  i: "group_add", action: () => setView("create_group_step1") },
            { l: "Schedule Meet", i: "video_call",action: () => navigate("meetings") },
          ].map(a => (
            <button key={a.l} onClick={a.action} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", background: T.primary, color: T.primaryText, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em" }}>
              <span className="msi" style={{ fontSize: 15 }}>{a.i}</span>{a.l}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          {/* Recent Conversations — both DMs and groups */}
          <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: T.text }}>Recent Conversations</div>
                <div style={{ fontSize: 11, color: T.textMuted }}>{allConversations.length} active threads</div>
              </div>
              <button onClick={() => setView("chat")} style={{ fontSize: 10, fontWeight: 700, color: "#405f91", background: "#d6e3ff", border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>View All</button>
            </div>
            {allConversations.slice(0, 7).map((c, i) => (
              <div key={c.id} onClick={() => { if (c.isGroup) { setSelGroup(groups.find(g => g.id === c.id)); setSelContact(null); } else { setSelContact(ALL_CONTACTS.find(x => x.id === c.id)); setSelGroup(null); } setView("chat"); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: `1px solid ${T.border}20`, cursor: "pointer", transition: "background 0.15s" }} onMouseOver={e => e.currentTarget.style.background = T.inputBg} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar name={c.name} size={42} idx={i} isGroup={!!c.isGroup} />
                  {!c.isGroup && c.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 9, height: 9, background: "#6bd8cb", borderRadius: "50%", border: "2px solid " + T.surface }}></span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                    <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12, color: T.text }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: T.textMuted }}>{c.time || "Recent"}</span>
                  </div>
                  <span style={{ fontSize: 11, color: T.textSub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{c.lastMsg || "No messages yet"}</span>
                  <span style={{ fontSize: 9, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.isGroup ? `Group · ${c.members.length} members` : c.role}</span>
                </div>
                {c.unread > 0 && <span style={{ background: "#405f91", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 9999 }}>{c.unread}</span>}
              </div>
            ))}
          </div>

          {/* Right: Activity + Meetings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#001736", borderRadius: 14, padding: 20, color: "#fff" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#6bd8cb", textTransform: "uppercase", letterSpacing: "0.14em" }}>Message Activity</div>
              <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 26, fontWeight: 800, margin: "4px 0 14px" }}>1,247 <span style={{ fontSize: 12, fontWeight: 400, color: "#94a3b8" }}>this week</span></div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 54 }}>
                {[45, 70, 55, 85, 90, 60, 75].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 4 ? "#6bd8cb" : "rgba(169,199,255,0.22)", borderRadius: "3px 3px 0 0" }}></div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                {["M","T","W","T","F","S","S"].map((d, i) => <span key={i} style={{ fontSize: 9, color: "#64748b", fontWeight: 700 }}>{d}</span>)}
              </div>
            </div>

            <div style={{ background: T.surface, borderRadius: 14, padding: 18, border: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 13, color: T.text }}>Upcoming Meetings</div>
                <button onClick={() => navigate("meetings")} style={{ fontSize: 10, fontWeight: 700, color: "#405f91", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>All →</button>
              </div>
              {[{ title: "Sprint Review", time: "Today 3:00 PM", p: "Zoom", c: "#d6e3ff" }, { title: "Client Sync", time: "Tomorrow 10:00 AM", p: "Meet", c: "#e7fffe" }].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", background: m.c, borderRadius: 8, marginBottom: 7 }}>
                  <span className="msi" style={{ color: "#405f91", fontSize: 20 }}>video_call</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12, color: "#001736" }}>{m.title}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{m.time} · {m.p}</div>
                  </div>
                  <button onClick={() => navigate("meetings")} style={{ fontSize: 9, fontWeight: 700, color: "#405f91", background: "none", border: "1px solid #405f91", padding: "3px 8px", borderRadius: 4, cursor: "pointer", textTransform: "uppercase" }}>Join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── NEW MESSAGE VIEW ──────────────────────────────────────
  if (view === "new_message") {
    const filtered = ALL_CONTACTS.filter(c => c.name.toLowerCase().includes(newMsgSearch.toLowerCase()));
    return (
      <div style={{ padding: "32px 40px", maxWidth: 600 }}>
        <BackBtn onClick={() => setView("summary")} T={T} />
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, marginBottom: 20 }}>New Message</div>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input value={newMsgSearch} onChange={e => setNewMsgSearch(e.target.value)} placeholder="Search contacts…" style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px 10px 36px", fontSize: 13, color: T.text, outline: "none", boxSizing: "border-box" }} />
          <span className="msi" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.textMuted, fontSize: 16 }}>search</span>
        </div>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>All Contacts</div>
        <div style={{ background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          {filtered.map((c, i) => (
            <div key={c.id} onClick={() => { setSelContact(c); setSelGroup(null); setView("chat"); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none", cursor: "pointer", transition: "background 0.12s" }} onMouseOver={e => e.currentTarget.style.background = T.inputBg} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ position: "relative" }}>
                <Avatar name={c.name} size={42} idx={i} />
                {c.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 9, height: 9, background: "#6bd8cb", borderRadius: "50%", border: "2px solid " + T.surface }}></span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 13, color: T.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: T.textSub }}>{c.role}</div>
              </div>
              {c.chatted && <span style={{ fontSize: 9, background: T.inputBg, color: "#405f91", padding: "2px 8px", borderRadius: 9999, fontWeight: 700 }}>Chatted</span>}
              <span className="msi" style={{ color: T.textMuted, fontSize: 18 }}>chevron_right</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── CREATE GROUP STEP 1 — select members ──────────────────
  if (view === "create_group_step1") {
    return (
      <div style={{ padding: "32px 40px", maxWidth: 560 }}>
        <BackBtn onClick={() => setView("summary")} T={T} />
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, marginBottom: 6 }}>Create Group</div>
        <div style={{ fontSize: 12, color: T.textSub, marginBottom: 20 }}>Select members to add to the group</div>
        <div style={{ background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 20 }}>
          {ALL_CONTACTS.map((c, i) => (
            <div key={c.id} onClick={() => handleGroupStep1Toggle(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < ALL_CONTACTS.length - 1 ? `1px solid ${T.border}` : "none", cursor: "pointer", background: groupStep1Selected.includes(c.id) ? T.inputBg : "transparent", transition: "background 0.12s" }}>
              <Avatar name={c.name} size={40} idx={i} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 13, color: T.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: T.textSub }}>{c.role}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${groupStep1Selected.includes(c.id) ? "#405f91" : T.borderStrong}`, background: groupStep1Selected.includes(c.id) ? "#405f91" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                {groupStep1Selected.includes(c.id) && <span className="msi" style={{ fontSize: 14, color: "#fff" }}>check</span>}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => groupStep1Selected.length > 0 && setView("create_group_step2")} style={{ padding: "11px 28px", background: groupStep1Selected.length > 0 ? "#001736" : T.borderStrong, color: "#fff", border: "none", borderRadius: 8, cursor: groupStep1Selected.length > 0 ? "pointer" : "not-allowed", fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Next ({groupStep1Selected.length} selected)
        </button>
      </div>
    );
  }

  // ── CREATE GROUP STEP 2 — name + dp ──────────────────────
  if (view === "create_group_step2") {
    return (
      <div style={{ padding: "32px 40px", maxWidth: 480 }}>
        <BackBtn onClick={() => setView("create_group_step1")} T={T} />
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, marginBottom: 20 }}>Name Your Group</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <label style={{ width: 80, height: 80, borderRadius: 20, background: T.inputBg, border: `2px dashed ${T.borderStrong}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 8 }}>
            <span className="msi" style={{ fontSize: 32, color: T.textMuted }}>add_a_photo</span>
            <span style={{ fontSize: 9, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Add Photo</span>
            <input type="file" accept=".png,.jpg,.jpeg" style={{ display: "none" }} />
          </label>
          <div style={{ fontSize: 10, color: T.textMuted }}>Optional group photo</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Group Name *</label>
          <input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. Design Team" style={{ width: "100%", background: T.inputBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: T.text, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{groupStep1Selected.length} Members Selected</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {groupStep1Selected.map(id => {
              const c = ALL_CONTACTS.find(x => x.id === id);
              return c ? <div key={id} style={{ display: "flex", alignItems: "center", gap: 6, background: T.inputBg, borderRadius: 9999, padding: "4px 10px 4px 6px" }}><Avatar name={c.name} size={22} idx={id} /><span style={{ fontSize: 11, color: T.text, fontWeight: 600 }}>{c.name.split(" ")[0]}</span></div> : null;
            })}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={createGroup} style={{ padding: "11px 28px", background: newGroupName.trim() ? "#001736" : T.borderStrong, color: "#fff", border: "none", borderRadius: 8, cursor: newGroupName.trim() ? "pointer" : "not-allowed", fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Create Group</button>
          <button onClick={() => setView("summary")} style={{ padding: "11px 22px", background: T.inputBg, color: T.textSub, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Cancel</button>
        </div>
      </div>
    );
  }

  // ── PROFILE VIEW ─────────────────────────────────────────
  if (view === "profile" && selContact) {
    const idx = ALL_CONTACTS.findIndex(c => c.id === selContact.id);
    return (
      <div style={{ padding: "32px 40px", maxWidth: 500 }}>
        <BackBtn onClick={() => setView("chat")} T={T} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
          <div style={{ width: 100, height: 100, borderRadius: 24, background: `linear-gradient(135deg,${memberColors[idx % memberColors.length]},#6bd8cb)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope',sans-serif", fontWeight: 800, color: "#fff", fontSize: 38, marginBottom: 16 }}>{selContact.name[0]}</div>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 22, color: T.text, marginBottom: 4 }}>{selContact.name}</div>
          <div style={{ fontSize: 13, color: T.textSub, marginBottom: 4 }}>{selContact.role}</div>
          <div style={{ fontSize: 13, color: "#405f91", fontWeight: 600 }}>{selContact.email}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: selContact.online ? "#6bd8cb" : T.textMuted }}></span>
            <span style={{ fontSize: 12, color: selContact.online ? "#2ca397" : T.textMuted }}>{selContact.online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── MEDIA VIEW (shared files between me and contact) ─────
  if (view === "media" && selContact) {
    const sharedFiles = SHARED_FILES[selContact.id] || [];
    return (
      <div style={{ padding: "32px 40px", maxWidth: 700 }}>
        <BackBtn onClick={() => setView("chat")} T={T} />
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 20, color: T.text, marginBottom: 4 }}>Shared Media</div>
        <div style={{ fontSize: 12, color: T.textSub, marginBottom: 20 }}>Files exchanged with {selContact.name}</div>
        {sharedFiles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: T.textMuted }}>
            <span className="msi" style={{ fontSize: 48, display: "block", marginBottom: 12 }}>folder_open</span>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: T.textSub }}>No shared files yet</div>
          </div>
        ) : (
          <div style={{ background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            {sharedFiles.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderBottom: i < sharedFiles.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 9, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="msi" style={{ color: f.color, fontSize: 20 }}>{f.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12, color: T.text }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: T.textMuted }}>From {f.sender} · {f.time}</div>
                </div>
                <span style={{ fontSize: 11, color: T.textSub, marginRight: 8 }}>{f.size}</span>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: T.inputBg, border: "none", borderRadius: 6, cursor: "pointer", color: "#405f91" }}>
                  <span className="msi" style={{ fontSize: 15 }}>download</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── CHAT LIST + OPEN CHAT ─────────────────────────────────
  const currentMsgs = selGroup ? (groupMsgs[selGroup.id] || []) : selContact ? (msgs[selContact.id] || []) : [];
  const groupNonMembers = selGroup ? ALL_CONTACTS.filter(c => !selGroup.members.includes(c.id)) : [];
  const isAdmin = selGroup?.adminId === 99; // current user is "me" = id 99

  const filteredConversations = allConversations.filter(c =>
  c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
      {/* Conversation List */}
      <div style={{ width: 290, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 14px 10px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
  <button
    onClick={() => setView("summary")}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      color: T.textMuted,
      display: "flex",
      padding: 4,
      marginRight: 6
    }}
  >
    <span className="msi" style={{ fontSize: 20 }}>arrow_back</span>
  </button>
</div>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 10 }}>All Messages</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button onClick={() => setView("new_message")} style={{ flex: 1, padding: "7px 0", background: "#001736", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span className="msi" style={{ fontSize: 14 }}>edit</span>New Message
            </button>
            <button onClick={() => setView("create_group_step1")} style={{ flex: 1, padding: "7px 0", background: T.inputBg, color: "#405f91", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span className="msi" style={{ fontSize: 14 }}>group_add</span>New Group
            </button>
          </div>
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              placeholder="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 7,
                border: `1px solid ${T.border}`,
                fontSize: 11,
                outline: "none",
                background: T.inputBg,
                color: T.text,
              }}
            />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Newly created groups appear first */}
          {filteredConversations.map((c, i) => {
            const isSelGroup = selGroup && c.isGroup && c.id === selGroup.id;
            const isSelContact = selContact && !c.isGroup && c.id === selContact.id;
            const active = isSelGroup || isSelContact;
            return (
              <div key={String(c.id)} onClick={() => { if (c.isGroup) { setSelGroup(groups.find(g => g.id === c.id)); setSelContact(null); } else { setSelContact(ALL_CONTACTS.find(x => x.id === c.id)); setSelGroup(null); } }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer", background: active ? T.inputBg : "transparent", borderLeft: active ? "3px solid #405f91" : "3px solid transparent", transition: "all 0.12s" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar name={c.name} size={40} idx={i} isGroup={!!c.isGroup} />
                  {!c.isGroup && c.online && <span style={{ position: "absolute", bottom: 2, right: 2, width: 8, height: 8, background: "#6bd8cb", borderRadius: "50%", border: "2px solid " + T.surface }}></span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12, color: T.text }}>{c.name}</span>
                    {c.unread > 0 && <span style={{ background: "#405f91", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 9999 }}>{c.unread}</span>}
                  </div>
                  <span style={{ fontSize: 10, color: T.textSub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{c.lastMsg || "No messages yet"}</span>
                  <span style={{ fontSize: 9, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.isGroup ? `Group · ${c.members.length} members` : c.role}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      {(selContact || selGroup) ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, minWidth: 0 }}>
          {/* Chat Header */}
          <div style={{ padding: "13px 20px", background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={selGroup ? selGroup.name : selContact.name} size={40} idx={selGroup ? groups.indexOf(selGroup) : ALL_CONTACTS.findIndex(c => c.id === selContact.id)} isGroup={!!selGroup} />
              <div>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: T.text }}>{selGroup ? selGroup.name : selContact.name}</div>
                <div style={{ fontSize: 11, color: selContact?.online ? "#2ca397" : T.textMuted, fontWeight: 600 }}>
                  {selGroup ? `${selGroup.members.length} members` : (selContact.online ? "● Online" : "● Offline")}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {/* Meeting icon — NO phone/call icon */}
              <button onClick={() => navigate("meetings")} style={{ width: 34, height: 34, borderRadius: 8, background: T.inputBg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#405f91" }}>
                <span className="msi" style={{ fontSize: 18 }}>video_call</span>
              </button>
              {/* Delete chat (only for DMs) */}
              {!selGroup && (
                <button onClick={() => setShowDeleteConfirm(true)} style={{ width: 34, height: 34, borderRadius: 8, background: "#ffdad6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ba1a1a" }}>
                  <span className="msi" style={{ fontSize: 18 }}>delete</span>
                </button>
              )}
              {/* Group add member — only admin */}
              {selGroup && isAdmin && (
                <button onClick={() => setShowAddMember(true)} style={{ width: 34, height: 34, borderRadius: 8, background: T.inputBg, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#405f91" }}>
                  <span className="msi" style={{ fontSize: 18 }}>group_add</span>
                </button>
              )}
            </div>
          </div>

          {/* Delete confirm */}
          {showDeleteConfirm && (
            <div style={{ margin: "12px 20px", background: "#ffdad6", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <span className="msi" style={{ color: "#ba1a1a", fontSize: 20 }}>warning</span>
              <div style={{ flex: 1, fontSize: 12, color: "#93000a" }}>Delete this conversation? This cannot be undone.</div>
              <button onClick={deleteChat} style={{ padding: "5px 14px", background: "#ba1a1a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 700 }}>Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: "5px 14px", background: "#fff", color: "#64748b", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 700 }}>Cancel</button>
            </div>
          )}

          {/* Add member popup */}
          {showAddMember && (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, boxShadow: "0 8px 32px rgba(0,23,54,0.15)", zIndex: 100, width: 340 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 15, color: T.text }}>Add Member</div>
                <button onClick={() => setShowAddMember(false)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted }}><span className="msi" style={{ fontSize: 18 }}>close</span></button>
              </div>
              {groupNonMembers.length === 0 ? (
                <div style={{ textAlign: "center", color: T.textMuted, padding: "20px 0", fontSize: 12 }}>All contacts are already members.</div>
              ) : groupNonMembers.map((c, i) => (
                <div key={c.id} onClick={() => addMemberToGroup(c.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", marginBottom: 6, background: T.inputBg, transition: "opacity 0.12s" }}>
                  <Avatar name={c.name} size={36} idx={i} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 12, color: T.text }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: T.textSub }}>{c.role}</div>
                  </div>
                  <span className="msi" style={{ color: "#405f91", fontSize: 20 }}>person_add</span>
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: T.border }}></div>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Today</span>
              <div style={{ flex: 1, height: 1, background: T.border }}></div>
            </div>
            {currentMsgs.map((msg, mi) => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.mine ? "flex-end" : "flex-start", marginBottom: 10 }}>
                {!msg.mine && (
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: memberColors[mi % memberColors.length], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope',sans-serif", fontWeight: 800, color: "#fff", fontSize: 11, marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                    {(msg.from || "?")[0]}
                  </div>
                )}
                <div style={{ maxWidth: "58%" }}>
                  {selGroup && !msg.mine && <div style={{ fontSize: 10, fontWeight: 700, color: T.textSub, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{msg.from} {msg.role === "admin" && <span style={{ background: "#d6e3ff", color: "#405f91", padding: "0 4px", borderRadius: 3, fontSize: 8 }}>Admin</span>}</div>}
                  {msg.type === "file" ? (
                    <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 4px", background: T.otherBubble, color: T.otherBubbleText, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="msi" style={{ color: "#ba1a1a", fontSize: 20 }}>picture_as_pdf</span>
                      <span style={{ fontSize: 12 }}>{msg.fileName}</span>
                    </div>
                  ) : (
                    <div style={{ padding: "9px 13px", borderRadius: msg.mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.mine ? T.bubble : T.otherBubble, color: msg.mine ? T.bubbleText : T.otherBubbleText, fontSize: 13, lineHeight: 1.5, border: msg.mine ? "none" : `1px solid ${T.border}`, boxShadow: "0 1px 3px rgba(0,23,54,0.05)" }}>{msg.text}</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3, justifyContent: msg.mine ? "flex-end" : "flex-start" }}>
                    <span style={{ fontSize: 10, color: T.textMuted }}>{msg.time}</span>
                    {msg.mine && !selGroup && <span className="msi" style={{ fontSize: 11, color: msg.status === "read" ? "#2ca397" : T.textMuted }}>{msg.status === "read" ? "done_all" : "check"}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input, file sharing per contact */}
          <div style={{ padding: "13px 20px", background: T.surface, borderTop: `1px solid ${T.border}`, position: "relative" }}>
            {showFilePopup && <FileUploadPopup onClose={() => setShowFilePopup(false)} T={T} />}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.inputBg, borderRadius: 10, padding: "7px 14px" }}>
              <button onClick={() => setShowFilePopup(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textSub, display: "flex", padding: 2 }}>
                <span className="msi" style={{ fontSize: 19 }}>attach_file</span>
              </button>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message…" style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: T.text, fontFamily: "'Inter',sans-serif" }} />
              <button onClick={sendMsg} style={{ background: "#001736", border: "none", cursor: "pointer", color: "#fff", width: 34, height: 34, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="msi" style={{ fontSize: 17 }}>send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: T.bg }}>
          <div style={{ textAlign: "center", color: T.textMuted }}>
            <span className="msi" style={{ fontSize: 56, display: "block", marginBottom: 12 }}>chat_bubble_outline</span>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 16, color: T.textSub }}>Select a conversation</div>
          </div>
        </div>
      )}

      {/* Right info panel for DMs */}
      {selContact && !selGroup && (
        <div style={{ width: 230, background: T.surface, borderLeft: `1px solid ${T.border}`, padding: 16, flexShrink: 0, overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ width: 58, height: 58, borderRadius: 14, background: `linear-gradient(135deg,${memberColors[ALL_CONTACTS.findIndex(c => c.id === selContact.id) % memberColors.length]},#6bd8cb)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Manrope',sans-serif", fontWeight: 800, color: "#fff", fontSize: 22, margin: "0 auto 8px" }}>{selContact.name[0]}</div>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: T.text }}>{selContact.name}</div>
            <div style={{ fontSize: 11, color: T.textSub }}>{selContact.role}</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {/* NO schedule meet here */}
            <button onClick={() => setView("profile")} style={{ flex: 1, padding: "7px 0", background: T.inputBg, color: "#405f91", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>View Profile</button>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Shared Media</div>
            {(SHARED_FILES[selContact.id] || []).slice(0, 4).map((f, i) => (
              <div key={i} onClick={() => setView("media")} style={{ height: 50, borderRadius: 7, background: f.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6 }}>
                <span className="msi" style={{ fontSize: 22, color: f.color }}>{f.icon}</span>
              </div>
            ))}
            <button onClick={() => setView("media")} style={{ marginTop: 6, width: "100%", padding: "7px 0", background: "none", border: `1px solid ${T.border}`, color: "#405f91", borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>View All Files</button>
          </div>
        </div>
      )}

      {/* Right info panel for groups */}
      {selGroup && (
        <div style={{ width: 200, background: T.surface, borderLeft: `1px solid ${T.border}`, padding: 14, flexShrink: 0, overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Members ({selGroup.members.length})</div>
          {selGroup.members.map((mid, i) => {
            const m = ALL_CONTACTS.find(c => c.id === mid);
            return m ? (
              <div key={mid} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${T.border}20` }}>
                <Avatar name={m.name} size={28} idx={i} />
                <div>
                  <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 11, color: T.text }}>{m.name.split(" ")[0]}</div>
                  <div style={{ fontSize: 9, color: T.textMuted }}>{mid === selGroup.adminId ? "Admin" : "Member"}</div>
                </div>
              </div>
            ) : null;
          })}
          {isAdmin && (
            <button onClick={() => setShowAddMember(true)} style={{ width: "100%", marginTop: 10, padding: "7px 0", background: T.inputBg, color: "#405f91", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>+ Add Member</button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MEETINGS PAGE ────────────────────────────────────────────
function MeetingsPage({ navigate, T }) {
  const [tab, setTab] = useState("upcoming");
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [instantMode, setInstantMode] = useState(false);
  const [instantLink, setInstantLink] = useState("");
  const copy = (id, link) => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
const generateInstantMeeting = async () => {
  try {
    const res = await fetch("http://localhost:3000/meeting/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Instant Meeting",
      }),
    });

    const data = await res.json();

    setGeneratedLink(data.url); 

  } catch (err) {
    console.error("Failed to generate meeting", err);
  }
};
  return (
    <div style={{ padding: "32px 40px", maxWidth: 1000 }}>
      <BackBtn onClick={() => navigate("messages")} T={T} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Virtual Collaboration
          </span>
          <h2 style={{ fontFamily: "'Manrope',sans-serif", fontSize: 24, fontWeight: 800, color: T.text, margin: "4px 0 4px", letterSpacing: "-0.02em" }}>
            Meeting Links
          </h2>
          <p style={{ fontSize: 12, color: T.textSub, margin: 0 }}>
            Schedule Meetings
          </p>
        </div>

        <button
          onClick={() => {
            setShowCreate(true);
            setGeneratedLink("");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 18px",
            background: T.primary,
            color: T.primaryText,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 10,
            textTransform: "uppercase"
          }}
        >
          <span className="msi" style={{ fontSize: 15 }}>add</span>
          Create New Meeting
        </button>
      </div>

      {showCreate && (
        <div style={{ marginBottom: 24, background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: 22 }}>
          
          <div style={{ fontWeight: 800, fontSize: 15, color: T.text, marginBottom: 16 }}>
            Start Instant Meeting
          </div>

          {!generatedLink ? (
            <button
              onClick={generateInstantMeeting}
              style={{
                padding: "10px 22px",
                background: "#001736",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 11,
                textTransform: "uppercase"
              }}
            >
              Generate Meeting Link
            </button>
          ) : (
            <>
              <div style={{ fontSize: 11, color: T.textSub, marginBottom: 6 }}>
                Your Meeting Link
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                  value={generatedLink}
                  readOnly
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${T.border}`,
                    background: T.inputBg,
                    fontSize: 11
                  }}
                />

                <button
                  onClick={() => copy("instant", generatedLink)}
                  style={{
                    padding: "8px 14px",
                    background: copied === "instant" ? "#e7fffe" : "#001736",
                    color: copied === "instant" ? "#2ca397" : "#fff",
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <span className="msi">
                    {copied === "instant" ? "check" : "content_copy"}
                  </span>
                  {copied === "instant" ? "Copied!" : "Copy"}
                </button>
              </div>

              <button
                onClick={() => window.open(generatedLink, "_blank")}
                style={{
                  padding: "9px 18px",
                  background: "#2ca397",
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase"
                }}
              >
                Join Now
              </button>
            </>
          )}

          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setShowCreate(false)}
              style={{
                padding: "8px 18px",
                background: T.inputBg,
                color: T.textSub,
                border: "none",
                borderRadius: 7,
                cursor: "pointer",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* KEEP YOUR EXISTING MEETINGS LIST BELOW UNCHANGED */}

      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: T.inputBg, borderRadius: 9, padding: 4, width: "fit-content" }}>
        {[{ k: "upcoming", l: "Upcoming" }, { k: "scheduled", l: "Scheduled" }, { k: "completed", l: "Completed" }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding: "7px 18px",
            borderRadius: 7,
            border: "none",
            background: tab === t.k ? "#001736" : "transparent",
            color: tab === t.k ? "#fff" : T.textSub,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            cursor: "pointer"
          }}>
            {t.l}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {MEETINGS_DATA.filter(m => m.status === tab).map(m => (
          <div key={m.id} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: 22 }}>
            
            <div style={{ fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 8 }}>
              {m.title}
            </div>

            {m.status !== "completed" ? (
  <div style={{ display: "flex", gap: 8 }}>
    <button
      onClick={() => window.open(m.link, "_blank")}
      style={{
        flex: 1,
        padding: "8px 0",
        background: "#001736",
        color: "#fff",
        border: "none",
        borderRadius: 7,
        cursor: "pointer",
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase"
      }}
    >
      Join
    </button>

    <button
      onClick={() => copy(m.id, m.link)}
      style={{
        flex: 1,
        padding: "8px 0",
        background: copied === m.id ? "#e7fffe" : T.inputBg,
        color: copied === m.id ? "#2ca397" : "#405f91",
        border: "none",
        borderRadius: 7,
        cursor: "pointer",
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase"
      }}
    >
      {copied === m.id ? "Copied!" : "Copy"}
    </button>
  </div>
) : (
  <div style={{ 
    padding: "8px 0",
    textAlign: "center",
    fontSize: 10,
    fontWeight: 700,
    color: T.textSub,
    background: T.inputBg,
    borderRadius: 7,
    textTransform: "uppercase"
  }}>
    Completed
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALERTS / NOTIFICATIONS PAGE ─────────────────────────────
function AlertsPage({ navigate, T }) {
  const [notifs, setNotifs]         = useState(ALL_NOTIFS_INIT);
  const [activeFilter, setActiveFilter] = useState("All");

  // Preferences stored as state so toggling actually filters
  const [prefs, setPrefs] = useState({
    "New Messages":       true,
    "Group Activity":     true,
    "Meeting Reminders":  true,
    "File Uploads":       false,
    "Email Digest":       false,
    "Push Notifications": true,
  });

  // type → pref key map
  const typeToPrefs = {
    message: "New Messages",
    group:   "Group Activity",
    meeting: "Meeting Reminders",
    file:    "File Uploads",
  };

  const togglePref = (label) => setPrefs(p => ({ ...p, [label]: !p[label] }));

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markRead    = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  // Filter by tab AND by preferences
  const shown = notifs.filter(n => {
    const prefKey = typeToPrefs[n.type];
    if (prefKey && !prefs[prefKey]) return false; // hidden by preference
    if (activeFilter === "All") return true;
    if (activeFilter === "Messages") return n.type === "message";
    if (activeFilter === "Groups")   return n.type === "group";
    if (activeFilter === "Meetings") return n.type === "meeting";
    if (activeFilter === "Files")    return n.type === "file";
    return true;
  });

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ padding: "32px 40px", maxWidth: 860 }}>
      <BackBtn onClick={() => navigate("messages")} T={T} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.1em" }}>Activity Center</span>
          <h2 style={{ fontFamily: "'Manrope',sans-serif", fontSize: 24, fontWeight: 800, color: T.text, margin: "4px 0 4px", letterSpacing: "-0.02em" }}>Notifications</h2>
          <p style={{ fontSize: 12, color: T.textSub, margin: 0 }}>{unread > 0 ? `${unread} unread notifications` : "All caught up!"}</p>
        </div>
        <button onClick={markAllRead} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: unread > 0 ? "#001736" : T.inputBg, color: unread > 0 ? "#fff" : T.textMuted, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          <span className="msi" style={{ fontSize: 15 }}>done_all</span>Mark All Read
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {["All", "Messages", "Groups", "Meetings", "Files"].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "7px 15px", borderRadius: 7, border: "1px solid", borderColor: activeFilter === f ? "#001736" : T.border, background: activeFilter === f ? "#001736" : T.surface, color: activeFilter === f ? "#fff" : T.textSub, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", cursor: "pointer" }}>
            {f}{f === "All" && unread > 0 && <span style={{ marginLeft: 5, background: "#ba1a1a", color: "#fff", borderRadius: 9999, padding: "0 4px", fontSize: 9 }}>{unread}</span>}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 32 }}>
        {shown.map(n => (
          <div key={n.id} onClick={() => markRead(n.id)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", background: n.read ? T.surface : T.inputBg, borderRadius: 12, border: "1px solid", borderColor: n.read ? T.border : "#c4d4f8", cursor: "pointer", transition: "all 0.12s" }} onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,23,54,0.06)"} onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="msi" style={{ color: n.color, fontSize: 19 }}>{n.icon}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: n.read ? 600 : 800, fontSize: 13, color: T.text }}>{n.title}</span>
                <span style={{ fontSize: 10, color: T.textMuted, flexShrink: 0, marginLeft: 10 }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 12, color: T.textSub }}>{n.body}</div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#405f91", flexShrink: 0, marginTop: 5 }}></div>}
          </div>
        ))}
        {shown.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px 0", color: T.textMuted }}>
            <span className="msi" style={{ fontSize: 48, display: "block", marginBottom: 12 }}>notifications_off</span>
            <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 15, color: T.textSub }}>No notifications here</div>
          </div>
        )}
      </div>

      {/* Preferences — functional toggles */}
      <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: 22 }}>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: T.text, marginBottom: 14 }}>Notification Preferences</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(prefs).map(([label, enabled]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 13px", background: T.inputBg, borderRadius: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{label}</span>
              <div onClick={() => togglePref(label)} style={{ width: 34, height: 19, borderRadius: 9, background: enabled ? "#405f91" : T.borderStrong, position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: enabled ? 18 : 3, transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage]       = useState("messages");
  const [darkMode, setDarkMode] = useState(false);
  const T = darkMode ? DARK : LIGHT;
  const navigate = (p) => setPage(p);

  const pages = {
    messages: <MessagesPage navigate={navigate} T={T} />,
    meetings: <MeetingsPage navigate={navigate} T={T} />,
    alerts:   <AlertsPage   navigate={navigate} T={T} />,
  };

  return (
    <Layout navigate={navigate} page={page} T={T} darkMode={darkMode} setDarkMode={setDarkMode}>
      {pages[page] || pages.messages}
    </Layout>
  );
}
