import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   i18n
   ═══════════════════════════════════════════════════════════════════════════ */
const LANG = {
  en: {
    appTitle:"Star Rewards", whoPlaying:"Who is playing today?",
    doTask:"Do a task", tapTask:"Tap a task you completed today!", parentApprove:"Mom or Dad will approve it",
    shop:"Shop", spendStars:"Spend your stars on rewards!", history:"History", noActivity:"No activity yet!",
    earned:"Earned", purchase:"Purchase", penalty:"Penalty",
    settings:"Settings", back:"← Back",
    addChild:"Add a Child", childName:"Child's name", chooseAvatar:"Choose avatar", addChildBtn:"Add Child",
    children:"Children", noChildren:"No children added yet. Tap ⚙️ to add one!",
    addTask:"Add a Task", taskPlaceholder:"e.g. Walk the dog", icon:"Icon", starsReward:"Stars reward", addTaskBtn:"Add Task",
    currentTasks:"Current Tasks", noTasks:"No tasks yet.",  noTasksHint:"No tasks yet! Parent can add tasks in ⚙️ Settings.",
    addShopItem:"Add Shop Item", shopPlaceholder:"e.g. Trip to the zoo", priceInStars:"Price in stars", addShopBtn:"Add to Shop",
    currentShop:"Current Shop Items", noShopItems:"No shop items yet!",
    saveChanges:"Save Changes", changesSaved:"Changes saved!",
    howItWorks:"How it works",
    howLine1:"Kids tap a task → Mom/Dad approves with password",
    howLine2:"Stars are added only after approval",
    howLine3:"Kids spend stars in the Shop",
    howLine4:"Tap ✏️ to edit any task or shop item",
    howLine5:"Tap ⚠️ to deduct stars (password protected)",
    howLine6:"Password: admin",
    parentPassword:"Parent Password", enterPassword:"Enter password to continue", confirm:"Confirm", cancel:"Cancel",
    parentApproval:"Parent Approval", approveQ:(t,s)=>`Approve "${t}" for +${s} ⭐?`,
    wrongPassword:"Wrong password ✕",
    deleteChild:"Delete child?", deleteItem:"Delete item?",
    removeStars:"Remove Stars", selectReason:"Select the reason",
    backToTasks:"← Back to Tasks",
    language:"Language",
    changeAvatar:"Change Avatar", takePhoto:"📷 Camera", uploadPhoto:"🖼️ From Photos", chooseEmoji:"Or choose an emoji", camSnap:"📸 Snap", camFlip:"🔄", camClose:"✕", camDenied:"Camera access denied. Please go to Settings → Safari → Privacy and allow camera for this site, then try again.",
    perCompletion:"per completion", starsPrice:"stars",
    tasks:"Tasks",
    unsavedTitle:"Unsaved Changes",
    unsavedMsg:"You have changes that are not saved. Do you want to save before leaving?",
    save:"Save", discard:"Discard",
  },
  he: {
    appTitle:"תגמולי כוכבים", whoPlaying:"מי משחק היום?",
    doTask:"משמרת", tapTask:"לחץ על משמרת שביצעת היום!", parentApprove:"אמא אולי אבא יאשרו את זה",
    shop:"חנות", spendStars:"הוצא את הכוכבים שלך על תגמולים!", history:"ההיסטוריה", noActivity:"אין פעילות עדיין!",
    earned:"הורוַיד", purchase:"קנייה", penalty:"עונש",
    settings:"הגדרות", back:"← חזור",
    addChild:"הוסף ילד", childName:"שם הילד", chooseAvatar:"בחר תמונה", addChildBtn:"הוסף ילד",
    children:"ילדים", noChildren:"אין ילדים עדיין. לחץ ⚙️ להוסיף!",
    addTask:"הוסף משמרת", taskPlaceholder:"למשל: לטיל עם הכלב", icon:"סמל", starsReward:"כוכבים לתגמול", addTaskBtn:"הוסף משמרת",
    currentTasks:"משמרתות נוכחיות", noTasks:"אין משמרתות עדיין.", noTasksHint:"אין משמרתות עדיין! האב יכול להוסיף בהגדרות ⚙️.",
    addShopItem:"הוסף מוצר לחנות", shopPlaceholder:"למשל: טיול לגן הבהמות", priceInStars:"מחיר בכוכבים", addShopBtn:"הוסף לחנות",
    currentShop:"מוצרי החנות", noShopItems:"אין מוצרים בחנות עדיין!",
    saveChanges:"שמור שינויים", changesSaved:"השינויים נשמעו!",
    howItWorks:"איך זה עובד",
    howLine1:"הילדים לחצו משמרת → אמא/אבא אשורים עם סיסמה",
    howLine2:"הכוכבים נוספים רק לאחר אישור",
    howLine3:"הילדים הוצאו כוכבים בחנות",
    howLine4:"לחץ ✏️ לעריכת משמרת או מוצר",
    howLine5:"לחץ ⚠️ להפחתת כוכבים (מוגן סיסמה)",
    howLine6:"סיסמה: admin",
    parentPassword:"סיסמת הורה", enterPassword:"הכנס סיסמה להמשיך", confirm:"אשור", cancel:"בטל",
    parentApproval:"אישור הורה", approveQ:(t,s)=>`אשור "${t}" ל +${s} ⭐?`,
    wrongPassword:"סיסמה שגיאה ✕",
    deleteChild:"מחק ילד?", deleteItem:"מחק מוצר?",
    removeStars:"הסיר כוכבים", selectReason:"בחר את הסיבה",
    backToTasks:"← חזור למשמרתות",
    language:"שפה",
    changeAvatar:"שינוי תמונה", takePhoto:"📷 תמונה", uploadPhoto:"🖼️ מתמונות", chooseEmoji:"או בחר emoji", camSnap:"📸 תפשט", camFlip:"🔄", camClose:"✕", camDenied:"גישה למצלמה נדחתה. לכנס הגדרות → ספריי → פרטיות והתיר גישה למצלמה.",
    perCompletion:"לכל השלמה", starsPrice:"כוכבים",
    tasks:"משמרתות",
    unsavedTitle:"שינויים לא נשמעו",
    unsavedMsg:"יש שינויים שלא נשמעו. אתה רוצה לשמור לפני שתיצא?",
    save:"שמור", discard:"תשכוח",
  },
  ru: {
    appTitle:"Награды звёздочки", whoPlaying:"Кто играет сегодня?",
    doTask:"Задание", tapTask:"Нажми на задание которое ты сделал!", parentApprove:"Мама или папа утвердит",
    shop:"Магазин", spendStars:"Трати свои звёздочки на награды!", history:"История", noActivity:"Пока нет активности!",
    earned:"Получено", purchase:"Покупка", penalty:"Штраф",
    settings:"Настройки", back:"← Назад",
    addChild:"Добавить ребёнка", childName:"Имя ребёнка", chooseAvatar:"Выбери аватар", addChildBtn:"Добавить",
    children:"Дети", noChildren:"Детей пока нет. Нажми ⚙️ чтобы добавить!",
    addTask:"Добавить задание", taskPlaceholder:"Например: Погулять с собакой", icon:"Иконка", starsReward:"Звёздочки за выполнение", addTaskBtn:"Добавить задание",
    currentTasks:"Текущие задания", noTasks:"Заданий пока нет.", noTasksHint:"Заданий пока нет! Папа может добавить в ⚙️ Настройках.",
    addShopItem:"Добавить товар", shopPlaceholder:"Например: Поездка в зоопарк", priceInStars:"Цена в звёздочках", addShopBtn:"Добавить в магазин",
    currentShop:"Товары магазина", noShopItems:"Товаров пока нет!",
    saveChanges:"Сохранить изменения", changesSaved:"Изменения сохранены!",
    howItWorks:"Как это работает",
    howLine1:"Дети нажимают задание → мама/папа утверждает паролем",
    howLine2:"Звёздочки добавляются только после утверждения",
    howLine3:"Дети тратят звёздочки в магазине",
    howLine4:"Нажми ✏️ чтобы редактировать задание или товар",
    howLine5:"Нажми ⚠️ для снятия звёздочек (защита паролем)",
    howLine6:"Пароль: admin",
    parentPassword:"Пароль родителя", enterPassword:"Введите пароль для продолжения", confirm:"Подтвердить", cancel:"Отмена",
    parentApproval:"Утверждение родителя", approveQ:(t,s)=>`Утвердить "${t}" за +${s} ⭐?`,
    wrongPassword:"Неверный пароль ✕",
    deleteChild:"Удалить ребёнка?", deleteItem:"Удалить товар?",
    removeStars:"Убрать звёздочки", selectReason:"Выбери причину",
    backToTasks:"← Назад к заданиям",
    language:"Язык",
    changeAvatar:"Сменить аватар", takePhoto:"📷 Камера", uploadPhoto:"🖼️ Из фотобиблиотеки", chooseEmoji:"Или выбери эмодзи", camSnap:"📸 Снять", camFlip:"🔄", camClose:"✕", camDenied:"Доступ к камере отклонён. Пожалуйста, перейдите в Настройки → Safari → Конфиденциальность и разрешите доступ к камере.",
    perCompletion:"за выполнение", starsPrice:"звёздочек",
    tasks:"Задания",
    unsavedTitle:"Несохранённые изменения",
    unsavedMsg:"Есть изменения которые не сохранены. Хотите сохранить перед выходом?",
    save:"Сохранить", discard:"Отменить",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */
const DEFAULT_TASKS = [
  {id:"clean_house",label:"Cleaned the house",stars:5,icon:"🏠"},
  {id:"clean_yard",label:"Cleaned the backyard",stars:5,icon:"🌳"},
  {id:"good_behavior",label:"Good behavior",stars:3,icon:"😊"},
  {id:"helped_parent",label:"Helped a parent",stars:4,icon:"🤝"},
  {id:"read_book",label:"Read a book",stars:3,icon:"📚"},
  {id:"ate_healthy",label:"Ate healthy food",stars:2,icon:"🥦"},
  {id:"tidied_room",label:"Tidied my room",stars:3,icon:"🛏️"},
  {id:"exercised",label:"Exercised today",stars:4,icon:"🏃"},
];
const DEFAULT_SHOP = [
  {id:"pool",label:"Go to the pool",stars:10,icon:"🏊"},
  {id:"movie",label:"Movie night",stars:8,icon:"🎬"},
  {id:"toy",label:"New toy",stars:15,icon:"🎁"},
  {id:"ice_cream",label:"Ice cream treat",stars:5,icon:"🍦"},
  {id:"sleepover",label:"Sleepover night",stars:12,icon:"🏕️"},
  {id:"extra_screen",label:"Extra screen time",stars:6,icon:"📺"},
];
const PENALTY_REASONS = [
  {id:"fighting",label:"Fighting",stars:3,icon:"👊"},
  {id:"lying",label:"Lying",stars:3,icon:"🤥"},
  {id:"not_listening",label:"Not listening",stars:2,icon:"🙉"},
  {id:"messy_room",label:"Left room messy",stars:2,icon:"🗑️"},
  {id:"screen_time",label:"Too much screen time",stars:2,icon:"📱"},
  {id:"rude",label:"Was rude",stars:3,icon:"😤"},
];
const AVATARS  = ["🧒","👦","👧","🧑","👨","👩","🦸","🦹","🧙","🧚","🧜","🧝","🐶","🐱","🦄","🐉","🦊","🐼","🐨","🐸"];
const ICONS    = ["🏠","🌳","😊","🤝","📚","🥦","🛏️","🏃","🧹","🐶","🐱","🎨","🎵","⚽","🚲","🌸","🧼","🍎","🌞","💪","🎭","🏆","🌈","⭐","🎪","🧺","🍳","🌻","🎲","🏋️","🏊","🎬","🎁","🍦","🏕️","📺","🍕","🎠","🧸","🎯"];
const STAR_OPTS = [1,2,3,4,5,6,7,8,9,10,12,15,20];

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
function StarBurst({count,onDone}){
  const [items]=useState(()=>Array.from({length:Math.max(count*3,6)},(_,i)=>({id:i,x:(Math.random()-.5)*280,y:-(Math.random()*180+50),size:18+Math.random()*26,delay:Math.random()*.25})));
  useEffect(()=>{const t=setTimeout(onDone,1100);return()=>clearTimeout(t);},[onDone]);
  return(<><style>{`@keyframes starPop{0%{opacity:1;transform:translate(0,0) scale(.2)}50%{opacity:1}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(1.3)}}`}</style><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}}>{items.map(s=><div key={s.id} style={{position:"absolute",fontSize:s.size,opacity:0,"--tx":`${s.x}px`,"--ty":`${s.y}px`,animation:`starPop .95s cubic-bezier(.2,.8,.3,1) ${s.delay}s forwards`}}>⭐</div>)}</div></>);
}
function RedFlash({onDone}){
  useEffect(()=>{const t=setTimeout(onDone,580);return()=>clearTimeout(t);},[onDone]);
  return(<><style>{`@keyframes rF{0%{opacity:1}100%{opacity:0}}`}</style><div style={{position:"fixed",inset:0,background:"rgba(220,0,0,.25)",zIndex:998,pointerEvents:"none",animation:"rF .58s ease-out forwards"}}/></>);
}
function Confetti({onDone}){
  const pieces=Array.from({length:44},(_,i)=>({id:i,color:["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff922b","#cc5de8"][i%6],x:Math.random()*120-60,delay:Math.random()*.3,size:8+Math.random()*9}));
  useEffect(()=>{const t=setTimeout(onDone,1400);return()=>clearTimeout(t);},[onDone]);
  return(<><style>{`@keyframes cF{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(440px) rotate(780deg)}}`}</style><div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}>{pieces.map(p=><div key={p.id} style={{position:"absolute",left:`${50+p.x}%`,top:"28%",width:p.size,height:p.size*1.7,background:p.color,borderRadius:3,opacity:0,animation:`cF 1.3s ease-in ${p.delay}s forwards`}}/>)}</div></>);
}
function SavedToast({msg,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,1800);return()=>clearTimeout(t);},[onDone]);
  return(<><style>{`@keyframes toastIn{0%{opacity:0;transform:translateY(40px)}30%{opacity:1;transform:translateY(0)}85%{opacity:1}100%{opacity:0}}`}</style><div style={{position:"fixed",bottom:40,left:"50%",transform:"translateX(-50%)",zIndex:1001,background:"#2d3436",color:"#fff",borderRadius:16,padding:"14px 28px",fontSize:18,fontWeight:700,boxShadow:"0 6px 24px rgba(0,0,0,.3)",animation:"toastIn 1.8s ease-out forwards",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>✅</span>{msg}</div></>);
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODALS
   ═══════════════════════════════════════════════════════════════════════════ */
function PasswordModal({title,subtitle,icon,btnConfirm,btnCancel,onSuccess,onCancel}){
  const [pw,setPw]=useState("");
  const [error,setError]=useState(false);
  const attempt=()=>{
    if(pw==="admin") return onSuccess();
    setError(true); setPw(""); setTimeout(()=>setError(false),1200);
  };
  return(<div style={S.overlay}><div style={S.modal}>
    <div style={{fontSize:52,marginBottom:6}}>{icon||"🔐"}</div>
    <h2 style={S.modalTitle}>{title||"Password"}</h2>
    <p style={S.modalSub}>{subtitle||""}</p>
    <input autoFocus type="password" placeholder="••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&attempt()} style={{...S.pwInput,borderColor:error?"#e03131":"#ddd"}}/>
    {error&&<p style={S.pwError}>{btnConfirm==="Confirm"?"Wrong password ✕":btnConfirm==="Подтвердить"?"Неверный пароль ✕":"סיסמה שגיאה ✕"}</p>}
    <div style={S.modalBtns}>
      <button onClick={onCancel} style={S.btnGrey}>{btnCancel||"Cancel"}</button>
      <button onClick={attempt} style={S.btnPurple}>{btnConfirm||"Confirm"}</button>
    </div>
  </div></div>);
}

function ConfirmModal({title,message,onYes,onNo,yesLabel="Delete",noLabel="Cancel"}){
  return(<div style={S.overlay}><div style={S.modal}>
    <div style={{fontSize:46,marginBottom:6}}>⚠️</div>
    <h2 style={S.modalTitle}>{title}</h2>
    <p style={S.modalSub}>{message}</p>
    <div style={S.modalBtns}>
      <button onClick={onNo}  style={S.btnGrey}>{noLabel}</button>
      <button onClick={onYes} style={{...S.btnPurple,background:"#e03131"}}>{yesLabel}</button>
    </div>
  </div></div>);
}

/* three-button modal: Save / Discard / Cancel */
function UnsavedModal({title,message,onSave,onDiscard,onCancel,t}){
  return(<div style={S.overlay}><div style={S.modal}>
    <div style={{fontSize:46,marginBottom:6}}>💾</div>
    <h2 style={S.modalTitle}>{title}</h2>
    <p style={S.modalSub}>{message}</p>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:20}}>
      <button onClick={onSave}    style={{...S.btnPurple,flex:"none",padding:"12px 0",borderRadius:14,border:"none",fontSize:17}}>{t.save}</button>
      <button onClick={onDiscard} style={{...S.btnPurple,flex:"none",padding:"12px 0",borderRadius:14,border:"none",fontSize:17,background:"#e17055"}}>{t.discard}</button>
      <button onClick={onCancel}  style={{...S.btnGrey,flex:"none",padding:"12px 0",borderRadius:14,border:"none",fontSize:17}}>{t.cancel}</button>
    </div>
  </div></div>);
}

/* ─── Live camera (full-screen, getUserMedia) ─── */
function CameraView({onCapture,onClose,t}){
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const streamRef  = useRef(null);
  const facingRef  = useRef("user");                 // ref so startCam reads latest without re-triggering effect
  const [facing,setFacing]  = useState("user");     // state only for snap mirror logic
  const [error,setError]    = useState(null);
  const [flash,setFlash]    = useState(false);

  /* start (or restart) the camera stream */
  const startCam = async (dir)=>{
    try {
      // kill previous stream if any
      if(streamRef.current){
        streamRef.current.getTracks().forEach(tr=>tr.stop());
        streamRef.current = null;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video:{ facingMode: dir, width:{ideal:1280}, height:{ideal:960} },
        audio: false
      });
      streamRef.current = stream;
      const v = videoRef.current;
      if(v){
        v.srcObject = stream;
        // do NOT call v.load() ─ it resets MediaStream on iOS Safari
        v.play().catch(()=>{});   // .play() returns a promise on iOS; swallow autoplay errors
      }
    } catch(e){
      setError(e.name==="NotAllowedError" ? t.camDenied : (e.message || "Camera not available"));
    }
  };

  /* mount → start once */
  useEffect(()=>{
    startCam(facingRef.current);
    return ()=>{ streamRef.current?.getTracks().forEach(tr=>tr.stop()); };
  },[]);                                             // eslint-disable-line – intentionally empty deps

  /* flip: stop current stream, update ref + state, restart */
  const flip = ()=>{
    const next = facingRef.current === "user" ? "environment" : "user";
    facingRef.current = next;
    setFacing(next);
    startCam(next);
  };

  const snap = ()=>{
    const v = videoRef.current, c = canvasRef.current;
    if(!v||!c) return;
    const w = v.videoWidth  || 640;
    const h = v.videoHeight || 480;
    c.width=w; c.height=h;
    const ctx = c.getContext("2d");
    if(facingRef.current==="user"){ ctx.translate(w,0); ctx.scale(-1,1); }
    ctx.drawImage(v,0,0,w,h);
    setFlash(true);
    setTimeout(()=>setFlash(false),200);
    streamRef.current?.getTracks().forEach(tr=>tr.stop());
    onCapture(c.toDataURL("image/jpeg",0.75));
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:1200,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:16}}>
      {flash&&<div style={{position:"absolute",inset:0,background:"#fff",zIndex:1,pointerEvents:"none"}}/>}

      {error
        ? <div style={{color:"#fff",textAlign:"center",padding:"0 24px",maxWidth:400}}>
            <div style={{fontSize:52,marginBottom:12}}>📷</div>
            <p style={{fontSize:17,lineHeight:1.5,margin:0}}>{error}</p>
            <button onClick={onClose} style={{...S.btnGrey,marginTop:24,padding:"12px 32px",borderRadius:14,border:"none",fontSize:16}}>{t.camClose}</button>
          </div>
        : <>
            <video ref={videoRef} autoPlay playsInline muted
              style={{width:"100%",maxWidth:520,borderRadius:18,objectFit:"cover",maxHeight:"58vh",background:"#111"}}/>
            <canvas ref={canvasRef} style={{display:"none"}}/>

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",maxWidth:520,marginTop:24}}>
              <button onClick={onClose} style={S.camCircleBtn}>{t.camClose}</button>
              <button onClick={snap} style={{width:70,height:70,borderRadius:35,border:"5px solid #fff",background:"#fff",cursor:"pointer",boxShadow:"0 0 0 3px rgba(255,255,255,.35)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:52,height:52,borderRadius:26,background:"#222"}}/>
              </button>
              <button onClick={flip} style={S.camCircleBtn}>{t.camFlip}</button>
            </div>
          </>
      }
    </div>
  );
}

/* ─── Avatar picker modal ─── */
function AvatarModal({current,onPick,onClose,t}){
  const [camOpen,setCamOpen] = useState(false);

  const handleFile = (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev)=>{ onPick(ev.target.result); };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* if camera view is open render it full-screen instead of the modal */
  if(camOpen){
    return <CameraView
      t={t}
      onCapture={(dataUrl)=>{ setCamOpen(false); onPick(dataUrl); }}
      onClose={()=>setCamOpen(false)}
    />;
  }

  return(<div style={S.overlay}><div style={{...S.modal,padding:"28px 20px 24px",maxHeight:"85vh",overflowY:"auto"}}>
    <h2 style={{...S.modalTitle,marginBottom:12}}>{t.changeAvatar}</h2>

    {/* two buttons side by side */}
    <div style={{display:"flex",gap:10,marginBottom:4}}>
      {/* Camera button ─ opens in-app camera via getUserMedia */}
      <button onClick={()=>setCamOpen(true)}
        style={{...S.btnPurple,flex:1,padding:"13px 0",borderRadius:14,border:"none",fontSize:16}}>
        {t.takePhoto}
      </button>
      {/* Photos button ─ label wraps input so iOS taps reach it natively */}
      <label style={{flex:1,position:"relative",cursor:"pointer"}}>
        <span style={{...S.btnPurple,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"13px 0",borderRadius:14,fontSize:16,pointerEvents:"none",boxSizing:"border-box",background:"#6c5ce7"}}>
          {t.uploadPhoto}
        </span>
        <input type="file" accept="image/*"
          style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0,cursor:"pointer",margin:0}}
          onChange={handleFile}/>
      </label>
    </div>

    <p style={{...S.fieldLabel,textAlign:"center",marginTop:18}}>{t.chooseEmoji}</p>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
      {AVATARS.map(a=>(
        <button key={a} onClick={()=>onPick(a)} style={{...S.chipBtn,...(current===a?S.chipActive:{}),width:46,height:46,fontSize:28}}>{a}</button>
      ))}
    </div>
    <button onClick={onClose} style={{...S.btnGrey,marginTop:18,width:"100%",padding:"11px 0",borderRadius:14,border:"none",fontSize:16}}>{t.cancel}</button>
  </div></div>);
}

/* ─── Inline item editor (tasks & shop) ─── */
function ItemEditor({item,labelPlaceholder,onSave,onCancel,t}){
  const [name,setName]=useState(item?.label||"");
  const [icon,setIcon]=useState(item?.icon||ICONS[0]);
  const [stars,setStars]=useState(item?.stars||3);
  return(<div style={S.editorWrap}>
    <input autoFocus placeholder={labelPlaceholder||"Name…"} value={name} onChange={e=>setName(e.target.value)} style={{...S.input,marginBottom:8}}/>
    <p style={S.fieldLabel}>{t.icon}</p>
    <div style={S.chipRow}>{ICONS.map(ic=><button key={ic} onClick={()=>setIcon(ic)} style={{...S.chipBtn,...(icon===ic?S.chipActive:{})}}>{ic}</button>)}</div>
    <p style={S.fieldLabel}>{t.starsReward}</p>
    <div style={S.starRow}>{STAR_OPTS.map(n=><button key={n} onClick={()=>setStars(n)} style={{...S.starPick,...(stars===n?S.starPickActive:{})}}>{n}</button>)}</div>
    <div style={{display:"flex",gap:8,marginTop:12}}>
      <button onClick={onCancel} style={{...S.btnGrey,flex:1,padding:"10px 0",borderRadius:12,border:"none",fontSize:15}}>{t.cancel}</button>
      <button onClick={()=>name.trim()&&onSave({label:name.trim(),icon,stars})} style={{...S.btnPurple,flex:1,padding:"10px 0",borderRadius:12,border:"none",fontSize:15}}>{t.confirm}</button>
    </div>
  </div>);
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App(){
  /* ── lang ── */
  const [lang,setLang] = useState("en");
  const t = LANG[lang] || LANG.en; // Fallback to English if lang is invalid

  /* ── committed (persisted) state ── */
  const [users,setUsers]           = useState([{id:"nikita",name:"Nikita",avatar:"🧒"}]);
  const [tasks,setTasks]           = useState(DEFAULT_TASKS);
  const [shopItems,setShopItems]   = useState(DEFAULT_SHOP);
  const [stars,setStars]           = useState({});
  const [history,setHistory]       = useState({});
  const [purchases,setPurchases]   = useState({});

  /* ── draft state (only written to storage on Save) ── */
  const [draftUsers,setDraftUsers] = useState(null);  // null = not in settings
  const [draftTasks,setDraftTasks] = useState(null);
  const [draftShop, setDraftShop]  = useState(null);

  /* ── screen ── */
  const [screen,setScreen]         = useState("users");
  const [activeUser,setActiveUser] = useState(null);

  /* ── UI ── */
  const [pwModal,setPwModal]       = useState(false);
  const [pwTarget,setPwTarget]     = useState(null);
  const [burst,setBurst]           = useState(0);
  const [redFlash,setRedFlash]     = useState(false);
  const [confetti,setConfetti]     = useState(false);
  const [justBought,setJustBought] = useState(null);
  const [confirmDel,setConfirmDel] = useState(null);
  const [showSaved,setShowSaved]   = useState(false);
  const [pendingTask,setPendingTask]= useState(null);
  const [avatarModal,setAvatarModal]= useState(null); // user id whose avatar is being edited

  /* ── unsaved-changes warning ── */
  const [showUnsaved,setShowUnsaved] = useState(false);

  /* ── settings form state ── */
  const [newName,setNewName]           = useState("");
  const [newAvatar,setNewAvatar]       = useState(AVATARS[0]);
  const [newTaskName,setNewTaskName]   = useState("");
  const [newTaskIcon,setNewTaskIcon]   = useState(ICONS[0]);
  const [newTaskStars,setNewTaskStars] = useState(3);
  const [newShopName,setNewShopName]   = useState("");
  const [newShopIcon,setNewShopIcon]   = useState(ICONS[0]);
  const [newShopStars,setNewShopStars] = useState(5);
  const [editingTask,setEditingTask]   = useState(null);
  const [editingShop,setEditingShop]   = useState(null);

  /* ── LOAD ── */
  useEffect(() => {
    (async () => {
      // Helper function to load from either storage
      const loadData = async (key, setter, parse = false) => {
        try {
          if (window.storage) {
            const r = await window.storage.get(key);
            if (r) setter(parse ? JSON.parse(r.value) : r.value);
          } else {
            const saved = localStorage.getItem(key);
            if (saved) setter(parse ? JSON.parse(saved) : saved);
          }
        } catch (e) {
          console.error(`Failed to load ${key}`, e);
        }
      };

      // Load language with validation
      try {
        if (window.storage) {
          const r = await window.storage.get("ra_lang");
          if (r && LANG[r.value]) setLang(r.value); // Only set if valid language
        } else {
          const saved = localStorage.getItem("ra_lang");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (LANG[parsed]) setLang(parsed); // Only set if valid language
          }
        }
      } catch (e) {
        console.error("Failed to load language", e);
      }

      await loadData("ra_users", setUsers, true);
      await loadData("ra_tasks", setTasks, true);
      await loadData("ra_shop", setShopItems, true);
      await loadData("ra_stars", setStars, true);
      await loadData("ra_hist", setHistory, true);
      await loadData("ra_purch", setPurchases, true);
    })();
  }, []);

  /* ── PERSIST — only stars / history / purchases / lang auto-save.
         users / tasks / shop persist ONLY when commitSettings() runs. ── */
  useEffect(() => {
    if (window.storage) {
      window.storage.set("ra_lang", lang).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_lang", JSON.stringify(lang));
      } catch (e) {
        console.error("Failed to save language", e);
      }
    }
  }, [lang]);
  useEffect(() => {
    if (window.storage) {
      window.storage.set("ra_stars", JSON.stringify(stars)).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_stars", JSON.stringify(stars));
      } catch (e) {
        console.error("Failed to save stars", e);
      }
    }
  }, [stars]);
  useEffect(() => {
    if (window.storage) {
      window.storage.set("ra_hist", JSON.stringify(history)).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_hist", JSON.stringify(history));
      } catch (e) {
        console.error("Failed to save history", e);
      }
    }
  }, [history]);
  useEffect(() => {
    if (window.storage) {
      window.storage.set("ra_purch", JSON.stringify(purchases)).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_purch", JSON.stringify(purchases));
      } catch (e) {
        console.error("Failed to save purchases", e);
      }
    }
  }, [purchases]);

  /* ── settings lifecycle ── */
  const enterSettings = ()=>{
    setDraftUsers(users.map(u=>({...u})));   // shallow clone each
    setDraftTasks(tasks.map(x=>({...x})));
    setDraftShop(shopItems.map(x=>({...x})));
    setScreen("settings");
  };

  /* did the parent actually change anything? */
  const hasDirtyDraft = useCallback(()=>{
    if(!draftUsers||!draftTasks||!draftShop) return false;
    return JSON.stringify(draftUsers)!==JSON.stringify(users)
        || JSON.stringify(draftTasks)!==JSON.stringify(tasks)
        || JSON.stringify(draftShop) !==JSON.stringify(shopItems);
  },[draftUsers,draftTasks,draftShop,users,tasks,shopItems]);

  const tryLeaveSettings = ()=>{
    if(hasDirtyDraft()) { setShowUnsaved(true); return; }
    leaveSettings();
  };
  const leaveSettings = ()=>{
    setDraftUsers(null); setDraftTasks(null); setDraftShop(null);
    setNewName(""); setNewTaskName(""); setNewShopName("");
    setEditingTask(null); setEditingShop(null);
    setShowUnsaved(false);
    setScreen("users");
  };
  const commitSettings = () => {
    setUsers(draftUsers);
    setTasks(draftTasks);
    setShopItems(draftShop);
    
    if (window.storage) {
      window.storage.set("ra_users", JSON.stringify(draftUsers)).catch(() => {});
      window.storage.set("ra_tasks", JSON.stringify(draftTasks)).catch(() => {});
      window.storage.set("ra_shop", JSON.stringify(draftShop)).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_users", JSON.stringify(draftUsers));
        localStorage.setItem("ra_tasks", JSON.stringify(draftTasks));
        localStorage.setItem("ra_shop", JSON.stringify(draftShop));
      } catch (e) {
        console.error("Failed to save settings", e);
      }
    }
    
    setShowSaved(true);
  };

  /* ── derived ── */
  const userStars     = activeUser?(stars[activeUser.id]||0):0;
  const userHistory   = activeUser?(history[activeUser.id]||[]):[];
  const userPurchases = activeUser?(purchases[activeUser.id]||[]):[];

  /* ── game actions ── */
  const openProtected = (target)=>{ setPwTarget(target); setPwModal(true); };
  const requestTask   = (task)=>  { setPendingTask(task); setPwTarget("approve"); setPwModal(true); };

  const approveTask = ()=>{
    if(!pendingTask||!activeUser) return;
    setStars(p=>({...p,[activeUser.id]:(p[activeUser.id]||0)+pendingTask.stars}));
    setHistory(p=>({...p,[activeUser.id]:[{task:pendingTask.label,icon:pendingTask.icon,stars:pendingTask.stars,date:new Date().toLocaleDateString(),type:"earn"},...(p[activeUser.id]||[])]}));
    setBurst(pendingTask.stars); setPendingTask(null);
  };
  const buyItem = (item)=>{
    if(userStars<item.stars) return;
    setStars(p=>({...p,[activeUser.id]:p[activeUser.id]-item.stars}));
    setPurchases(p=>({...p,[activeUser.id]:[{item:item.label,icon:item.icon,stars:item.stars,date:new Date().toLocaleDateString()},...(p[activeUser.id]||[])]}));
    setConfetti(true); setJustBought(item);
  };
  const penalizeUser = (reason)=>{
    const deduct=Math.min(reason.stars,userStars);
    setStars(p=>({...p,[activeUser.id]:(p[activeUser.id]||0)-deduct}));
    setHistory(p=>({...p,[activeUser.id]:[{task:reason.label,icon:reason.icon,stars:deduct,date:new Date().toLocaleDateString(),type:"penalty"},...(p[activeUser.id]||[])]}));
    setRedFlash(true); setScreen("tasks");
  };

  /* ── settings CRUD — all operate on drafts ── */
  const addUser = ()=>{
    if(!newName.trim()) return;
    setDraftUsers(p=>[...p,{id:newName.trim().toLowerCase().replace(/\s+/g,"_")+"_"+Date.now(),name:newName.trim(),avatar:newAvatar}]);
    setNewName(""); setNewAvatar(AVATARS[0]);
  };
  const deleteUser = (uid)=>{ setDraftUsers(p=>p.filter(u=>u.id!==uid)); setConfirmDel(null); };

  const addTask = ()=>{
    if(!newTaskName.trim()) return;
    setDraftTasks(p=>[...p,{id:"task_"+Date.now(),label:newTaskName.trim(),icon:newTaskIcon,stars:newTaskStars}]);
    setNewTaskName(""); setNewTaskIcon(ICONS[0]); setNewTaskStars(3);
  };
  const updateTask  = (tid,data)=>{ setDraftTasks(p=>p.map(x=>x.id===tid?{...x,...data}:x)); setEditingTask(null); };
  const deleteTask  = (tid)=>      { setDraftTasks(p=>p.filter(x=>x.id!==tid)); setConfirmDel(null); };

  const addShopItem   = ()=>{
    if(!newShopName.trim()) return;
    setDraftShop(p=>[...p,{id:"shop_"+Date.now(),label:newShopName.trim(),icon:newShopIcon,stars:newShopStars}]);
    setNewShopName(""); setNewShopIcon(ICONS[0]); setNewShopStars(5);
  };
  const updateShopItem = (sid,data)=>{ setDraftShop(p=>p.map(x=>x.id===sid?{...x,...data}:x)); setEditingShop(null); };
  const deleteShopItem = (sid)=>     { setDraftShop(p=>p.filter(x=>x.id!==sid)); setConfirmDel(null); };

  /* avatar change — happens on the user-select screen, commits immediately for that one user */
  const changeAvatar = (uid, newAv) => {
    const updated = users.map(u => u.id === uid ? {...u, avatar: newAv} : u);
    setUsers(updated);
    
    if (window.storage) {
      window.storage.set("ra_users", JSON.stringify(updated)).catch(() => {});
    } else {
      try {
        localStorage.setItem("ra_users", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save avatar", e);
      }
    }
    
    setAvatarModal(null);
  };

  /* ═══════════════════════════════════════════════════════════════════════
     MODAL LAYER  (rendered first — highest z priority)
     ═══════════════════════════════════════════════════════════════════════ */

  /* unsaved-changes warning */
  if(showUnsaved){
    return <UnsavedModal
      title={t.unsavedTitle}
      message={t.unsavedMsg}
      t={t}
      onSave={()=>{ commitSettings(); setShowUnsaved(false); leaveSettings(); }}
      onDiscard={()=>{ setShowUnsaved(false); leaveSettings(); }}
      onCancel={()=>setShowUnsaved(false)}
    />;
  }

  /* avatar picker */
  if(avatarModal){
    const user = users.find(u=>u.id===avatarModal);
    if(user) return <AvatarModal current={user.avatar} onPick={(av)=>changeAvatar(avatarModal,av)} onClose={()=>setAvatarModal(null)} t={t}/>;
  }

  /* password */
  if(pwModal){
    if(pwTarget==="approve"){
      return <PasswordModal icon="👨‍👧" title={t.parentApproval} subtitle={t.approveQ(pendingTask?.label||"",pendingTask?.stars||0)}
        btnConfirm={t.confirm} btnCancel={t.cancel}
        onSuccess={()=>{setPwModal(false);approveTask();}}
        onCancel={()=>{setPwModal(false);setPendingTask(null);}}/>;
    }
    return <PasswordModal title={t.parentPassword} subtitle={t.enterPassword}
      btnConfirm={t.confirm} btnCancel={t.cancel}
      onSuccess={()=>{setPwModal(false); pwTarget==="settings"?enterSettings():setScreen(pwTarget);}}
      onCancel={()=>setPwModal(false)}/>;
  }

  /* delete confirm */
  if(confirmDel){
    const labels={
      user: draftUsers?.find(u=>u.id===confirmDel.id)?.name||"?",
      task: draftTasks?.find(x=>x.id===confirmDel.id)?.label||"?",
      shop: draftShop?.find(x=>x.id===confirmDel.id)?.label||"?",
    };
    return <ConfirmModal
      title={confirmDel.type==="user"?t.deleteChild:t.deleteItem}
      message={`"${labels[confirmDel.type]}"`}
      yesLabel={t.discard||"Delete"} noLabel={t.cancel}
      onYes={()=>{
        if(confirmDel.type==="user") deleteUser(confirmDel.id);
        else if(confirmDel.type==="task") deleteTask(confirmDel.id);
        else deleteShopItem(confirmDel.id);
      }}
      onNo={()=>setConfirmDel(null)}
    />;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SHARED LAYOUT PIECES
     ═══════════════════════════════════════════════════════════════════════ */
  const Header = ({title})=>(
    <div style={S.header}>
      <button onClick={()=>{setScreen("users");setActiveUser(null);setPendingTask(null);}} style={S.backBtn}>{t.back}</button>
      <div style={S.headerCenter}>
        <span style={S.headerName}>{activeUser?.name}</span>
        <span style={S.headerTitle}>{title}</span>
      </div>
      <div style={S.starCounter}>⭐ <strong style={{marginLeft:3}}>{userStars}</strong></div>
    </div>
  );
  const NavTabs = ()=>(
    <div style={S.navTabs}>
      {[["tasks",`✅ ${t.tasks}`],["shop",`🛍️ ${t.shop}`],["history",`📜 ${t.history}`]].map(([k,l])=>(
        <button key={k} onClick={()=>setScreen(k)} style={{...S.navTab,...(screen===k?S.navTabActive:{})}}>{l}</button>
      ))}
      <button onClick={()=>openProtected("penalize")} style={S.penBtn}>⚠️</button>
    </div>
  );
  const LangSwitch = ()=>(
    <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16,marginTop:14}}>
      {[["en","EN"],["he","עב"],["ru","РУ"]].map(([code,label])=>(
        <button key={code} onClick={()=>setLang(code)} style={{...S.langBtn,...(lang===code?S.langBtnActive:{})}}>{label}</button>
      ))}
    </div>
  );

  /* helper: render an avatar (emoji or photo) at a given size */
  const AvatarImg = ({src,size=64,border})=>{
    const isPhoto = src?.startsWith("data:");
    if(isPhoto) return <div style={{width:size,height:size,borderRadius:size/2,overflow:"hidden",border:border||"none",flexShrink:0}}><img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>;
    return <div style={{fontSize:size*0.85,lineHeight:`${size}px`,textAlign:"center",flexShrink:0}}>{src}</div>;
  };

  /* ═══════════════════════════════════════════════════════════════════════
     SCREENS
     ═══════════════════════════════════════════════════════════════════════ */

  /* ── USER SELECT ── */
  if(screen==="users") return(
    <div style={S.bg}>
      <button onClick={()=>openProtected("settings")} style={S.gearBtn}>⚙️</button>
      <LangSwitch/>
      <div style={S.titleBlock}>
        <div style={{fontSize:58}}>🌟</div>
        <h1 style={S.title}>{t.appTitle}</h1>
        <p style={S.subtitle}>{t.whoPlaying}</p>
      </div>
      <div style={S.userGrid}>
        {users.map(u=>(
          <div key={u.id} style={{position:"relative"}}>
            <button onClick={()=>{setActiveUser(u);setScreen("tasks");}} style={S.userCard}>
              <AvatarImg src={u.avatar} size={72} border="3px solid #5f27cd"/>
              <div style={S.userName}>{u.name}</div>
              <div style={S.starBadge}>⭐ <span style={{fontWeight:800,fontSize:20,marginLeft:4}}>{stars[u.id]||0}</span></div>
            </button>
            {/* tiny pencil to open avatar picker */}
            <button onClick={(e)=>{e.stopPropagation();setAvatarModal(u.id);}} style={S.avatarEditBtn}>✏️</button>
          </div>
        ))}
      </div>
      {users.length===0&&<p style={{color:"#636e72",fontSize:18,textAlign:"center",marginTop:40}}>{t.noChildren}</p>}
    </div>
  );

  /* ── TASKS ── */
  if(screen==="tasks") return(
    <div style={S.bg}>
      {burst>0  &&<StarBurst count={burst} onDone={()=>setBurst(0)}/>}
      {redFlash &&<RedFlash onDone={()=>setRedFlash(false)}/>}
      <Header title={t.doTask}/>
      <NavTabs/>
      <div style={S.content}>
        <p style={S.hint}>{t.tapTask}</p>
        <p style={S.hintSub}>{t.parentApprove} 👨‍👧</p>
        {tasks.length===0
          ?<p style={S.emptyText}>{t.noTasksHint}</p>
          :<div style={S.grid}>{tasks.map(task=>(
            <button key={task.id} onClick={()=>requestTask(task)} style={S.taskCard}>
              <div style={{fontSize:42,marginBottom:4}}>{task.icon}</div>
              <div style={S.taskLabel}>{task.label}</div>
              <div style={S.taskReward}>+{task.stars} ⭐</div>
            </button>
          ))}</div>
        }
      </div>
    </div>
  );

  /* ── SHOP ── */
  if(screen==="shop") return(
    <div style={S.bg}>
      {confetti&&<Confetti onDone={()=>{setConfetti(false);setJustBought(null);}}/>}
      <Header title={t.shop}/>
      <NavTabs/>
      <div style={S.content}>
        {justBought&&<div style={S.purchaseAlert}>🎉 {justBought.label}!</div>}
        <p style={S.hint}>{t.spendStars}</p>
        <div style={S.grid}>
          {shopItems.map(item=>{
            const ok=userStars>=item.stars;
            return(<button key={item.id} onClick={()=>ok&&buyItem(item)} disabled={!ok} style={{...S.taskCard,...(!ok?S.disabled:{})}}>
              <div style={{fontSize:42,marginBottom:4}}>{item.icon}</div>
              <div style={S.taskLabel}>{item.label}</div>
              <div style={S.taskReward}>{ok?<span style={{color:"#00b894"}}>⭐ {item.stars}</span>:<span style={{color:"#d63031",fontSize:14}}>🔒 {item.stars} ⭐</span>}</div>
            </button>);
          })}
        </div>
        {shopItems.length===0&&<p style={S.emptyText}>{t.noShopItems}</p>}
      </div>
    </div>
  );

  /* ── HISTORY ── */
  if(screen==="history"){
    const all=[
      ...userHistory.map(h=>({...h})),
      ...userPurchases.map(p=>({task:p.item,icon:p.icon,stars:p.stars,date:p.date,type:"purchase"})),
    ];
    return(<div style={S.bg}>
      <Header title={t.history}/>
      <NavTabs/>
      <div style={S.content}>
        {all.length===0?<p style={S.emptyText}>{t.noActivity}</p>
          :all.map((h,i)=>{
            const bad=h.type==="penalty"||h.type==="purchase";
            const label=h.type==="penalty"?t.penalty:h.type==="purchase"?t.purchase:t.earned;
            return(<div key={i} style={S.histRow}>
              <span style={{fontSize:26,marginRight:10}}>{h.icon}</span>
              <div style={{flex:1}}>
                <div style={S.histLabel}>{h.task}</div>
                <div style={S.histDate}>{h.date} · {label}</div>
              </div>
              <div style={{...S.histStars,color:bad?"#e03131":"#00b894"}}>{bad?"-":"+"}{h.stars} ⭐</div>
            </div>);
          })
        }
      </div>
    </div>);
  }

  /* ── PENALIZE ── */
  if(screen==="penalize") return(<div style={S.bg}>
    <Header title={t.removeStars}/>
    <div style={S.content}>
      <div style={S.penalizeHeader}>
        <span style={{fontSize:38}}>⚠️</span>
        <div><div style={{fontWeight:800,fontSize:18,color:"#d63031"}}>{t.removeStars}</div><div style={{fontSize:14,color:"#636e72"}}>{t.selectReason}</div></div>
      </div>
      <div style={S.grid}>{PENALTY_REASONS.map(r=>(
        <button key={r.id} onClick={()=>penalizeUser(r)} style={S.penCard}>
          <div style={{fontSize:40,marginBottom:4}}>{r.icon}</div>
          <div style={S.taskLabel}>{r.label}</div>
          <div style={{...S.taskReward,color:"#e03131"}}>−{r.stars} ⭐</div>
        </button>
      ))}</div>
      <button onClick={()=>setScreen("tasks")} style={S.cancelBtn}>{t.backToTasks}</button>
    </div>
  </div>);

  /* ── SETTINGS ── */
  if(screen==="settings" && draftUsers && draftTasks && draftShop) return(<div style={S.bg}>
    {showSaved&&<SavedToast msg={t.changesSaved} onDone={()=>setShowSaved(false)}/>}
    <div style={S.settingsHead}>
      <button onClick={tryLeaveSettings} style={S.backBtn}>{t.back}</button>
      <span style={S.settingsTitle}>⚙️ {t.settings}</span>
      <div style={{width:60}}/>
    </div>
    <div style={S.content}>

      {/* language */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>🌐 {t.language}</h3>
        <div style={{display:"flex",gap:10}}>
          {[["en","English"],["he","עברית"],["ru","Русский"]].map(([code,name])=>(
            <button key={code} onClick={()=>setLang(code)} style={{...S.langBtnBig,...(lang===code?S.langBtnBigActive:{})}}>{name}</button>
          ))}
        </div>
      </div>

      {/* add child */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>➕ {t.addChild}</h3>
        <input placeholder={t.childName} value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addUser()} style={S.input}/>
        <p style={S.fieldLabel}>{t.chooseAvatar}</p>
        <div style={S.chipRow}>{AVATARS.map(a=><button key={a} onClick={()=>setNewAvatar(a)} style={{...S.chipBtn,...(newAvatar===a?S.chipActive:{})}}>{a}</button>)}</div>
        <button onClick={addUser} style={S.btnFullPurple}>{t.addChildBtn}</button>
      </div>

      {/* children list */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>👨‍👧‍👦 {t.children}</h3>
        {draftUsers.length===0&&<p style={S.emptyText}>{t.noChildren}</p>}
        {draftUsers.map(u=>(
          <div key={u.id} style={S.row}>
            <AvatarImg src={u.avatar} size={36} border="2px solid #eee"/>
            <div style={{flex:1,marginLeft:10}}>
              <div style={{fontWeight:700,fontSize:17,color:"#2d3436"}}>{u.name}</div>
              <div style={{fontSize:14,color:"#636e72"}}>⭐ {stars[u.id]||0}</div>
            </div>
            <button onClick={()=>setConfirmDel({type:"user",id:u.id})} style={S.delBtn}>🗑️</button>
          </div>
        ))}
      </div>

      {/* add task */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>➕ {t.addTask}</h3>
        <input placeholder={t.taskPlaceholder} value={newTaskName} onChange={e=>setNewTaskName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} style={S.input}/>
        <p style={S.fieldLabel}>{t.icon}</p>
        <div style={S.chipRow}>{ICONS.map(ic=><button key={ic} onClick={()=>setNewTaskIcon(ic)} style={{...S.chipBtn,...(newTaskIcon===ic?S.chipActive:{})}}>{ic}</button>)}</div>
        <p style={S.fieldLabel}>{t.starsReward}</p>
        <div style={S.starRow}>{STAR_OPTS.map(n=><button key={n} onClick={()=>setNewTaskStars(n)} style={{...S.starPick,...(newTaskStars===n?S.starPickActive:{})}}>{n}</button>)}</div>
        <button onClick={addTask} style={S.btnFullPurple}>{t.addTaskBtn}</button>
      </div>

      {/* task list */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>📋 {t.currentTasks}</h3>
        {draftTasks.length===0&&<p style={S.emptyText}>{t.noTasks}</p>}
        {draftTasks.map(x=>(
          <div key={x.id}>
            {editingTask===x.id
              ?<ItemEditor item={x} labelPlaceholder={t.taskPlaceholder} onSave={(d)=>updateTask(x.id,d)} onCancel={()=>setEditingTask(null)} t={t}/>
              :<div style={S.row}>
                <span style={{fontSize:28,marginRight:10}}>{x.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:16,color:"#2d3436"}}>{x.label}</div><div style={{fontSize:14,color:"#636e72"}}>+{x.stars} ⭐ {t.perCompletion}</div></div>
                <button onClick={()=>setEditingTask(x.id)} style={S.editBtn}>✏️</button>
                <button onClick={()=>setConfirmDel({type:"task",id:x.id})} style={S.delBtn}>🗑️</button>
              </div>
            }
          </div>
        ))}
      </div>

      {/* add shop item */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>➕ {t.addShopItem}</h3>
        <input placeholder={t.shopPlaceholder} value={newShopName} onChange={e=>setNewShopName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addShopItem()} style={S.input}/>
        <p style={S.fieldLabel}>{t.icon}</p>
        <div style={S.chipRow}>{ICONS.map(ic=><button key={ic} onClick={()=>setNewShopIcon(ic)} style={{...S.chipBtn,...(newShopIcon===ic?S.chipActive:{})}}>{ic}</button>)}</div>
        <p style={S.fieldLabel}>{t.priceInStars}</p>
        <div style={S.starRow}>{STAR_OPTS.map(n=><button key={n} onClick={()=>setNewShopStars(n)} style={{...S.starPick,...(newShopStars===n?S.starPickActive:{})}}>{n}</button>)}</div>
        <button onClick={addShopItem} style={S.btnFullPurple}>{t.addShopBtn}</button>
      </div>

      {/* shop list */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>🛍️ {t.currentShop}</h3>
        {draftShop.length===0&&<p style={S.emptyText}>{t.noShopItems}</p>}
        {draftShop.map(x=>(
          <div key={x.id}>
            {editingShop===x.id
              ?<ItemEditor item={x} labelPlaceholder={t.shopPlaceholder} onSave={(d)=>updateShopItem(x.id,d)} onCancel={()=>setEditingShop(null)} t={t}/>
              :<div style={S.row}>
                <span style={{fontSize:28,marginRight:10}}>{x.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:16,color:"#2d3436"}}>{x.label}</div><div style={{fontSize:14,color:"#636e72"}}>⭐ {x.stars} {t.starsPrice}</div></div>
                <button onClick={()=>setEditingShop(x.id)} style={S.editBtn}>✏️</button>
                <button onClick={()=>setConfirmDel({type:"shop",id:x.id})} style={S.delBtn}>🗑️</button>
              </div>
            }
          </div>
        ))}
      </div>

      {/* SAVE */}
      <button onClick={commitSettings} style={S.saveBtn}><span style={{fontSize:22}}>💾</span> {t.saveChanges}</button>

      {/* info */}
      <div style={S.card}>
        <h3 style={S.cardTitle}>📝 {t.howItWorks}</h3>
        <p style={{color:"#636e72",fontSize:15,margin:0,lineHeight:1.7}}>
          • {t.howLine1}<br/>• {t.howLine2}<br/>• {t.howLine3}<br/>• {t.howLine4}<br/>• {t.howLine5}<br/>• {t.howLine6}
        </p>
      </div>
    </div>
  </div>);

  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════════════════ */
const S = {
  bg:{minHeight:"100vh",background:"linear-gradient(150deg,#ffecd2 0%,#fcb69f 38%,#a18cd1 100%)",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 16px 44px",position:"relative"},

  gearBtn:{position:"absolute",top:18,right:22,background:"rgba(255,255,255,.38)",border:"none",borderRadius:16,fontSize:26,padding:"6px 12px",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.1)"},
  titleBlock:{textAlign:"center",marginTop:48,marginBottom:32},
  title:{margin:0,fontSize:44,fontWeight:900,color:"#5f27cd",textShadow:"2px 2px 0 rgba(255,255,255,.4)"},
  subtitle:{margin:"8px 0 0",fontSize:21,color:"#6c5ce7",fontWeight:600},
  userGrid:{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"},
  userCard:{background:"#fff",border:"none",borderRadius:26,boxShadow:"0 8px 28px rgba(0,0,0,.14)",padding:"22px 20px 16px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",minWidth:140},
  userName:{fontSize:22,fontWeight:800,color:"#2d3436",marginBottom:8,marginTop:6},
  starBadge:{background:"linear-gradient(135deg,#ffeaa7,#fdcb6e)",borderRadius:18,padding:"5px 14px",display:"flex",alignItems:"center",color:"#636e72",fontSize:17},
  avatarEditBtn:{position:"absolute",top:2,right:2,background:"rgba(255,255,255,.9)",border:"none",borderRadius:12,fontSize:15,padding:"3px 7px",cursor:"pointer",boxShadow:"0 2px 6px rgba(0,0,0,.18)"},

  header:{width:"100%",maxWidth:640,marginTop:18,display:"flex",alignItems:"center",justifyContent:"space-between"},
  backBtn:{background:"rgba(255,255,255,.38)",border:"none",borderRadius:14,padding:"8px 14px",fontSize:17,cursor:"pointer",fontWeight:700,color:"#5f27cd"},
  headerCenter:{display:"flex",flexDirection:"column",alignItems:"center"},
  headerName:{fontSize:21,fontWeight:800,color:"#2d3436"},
  headerTitle:{fontSize:14,color:"#636e72",fontWeight:600},
  starCounter:{background:"linear-gradient(135deg,#ffeaa7,#fdcb6e)",borderRadius:18,padding:"5px 16px",fontSize:19,color:"#636e72",fontWeight:700,boxShadow:"0 3px 10px rgba(0,0,0,.1)"},

  navTabs:{display:"flex",gap:8,marginTop:16,width:"100%",maxWidth:640,alignItems:"center"},
  navTab:{flex:1,padding:"10px 0",border:"none",borderRadius:15,background:"rgba(255,255,255,.3)",fontSize:16,fontWeight:700,color:"#5f27cd",cursor:"pointer"},
  navTabActive:{background:"#5f27cd",color:"#fff",boxShadow:"0 4px 14px rgba(95,39,205,.4)"},
  penBtn:{background:"rgba(255,255,255,.35)",border:"none",borderRadius:15,padding:"10px 14px",fontSize:20,cursor:"pointer"},

  content:{width:"100%",maxWidth:640,marginTop:16},
  hint:{textAlign:"center",color:"#636e72",fontSize:16,fontWeight:600,marginBottom:4},
  hintSub:{textAlign:"center",color:"#a29bfe",fontSize:14,fontWeight:600,marginBottom:10,marginTop:0},
  grid:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12},
  taskCard:{background:"#fff",border:"none",borderRadius:20,boxShadow:"0 5px 18px rgba(0,0,0,.11)",padding:"20px 10px 14px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center"},
  disabled:{opacity:.48,cursor:"not-allowed",filter:"grayscale(.3)"},
  taskLabel:{fontSize:14,fontWeight:700,color:"#2d3436",textAlign:"center",lineHeight:1.3},
  taskReward:{marginTop:6,fontSize:16,fontWeight:800,color:"#e17055"},

  purchaseAlert:{background:"linear-gradient(135deg,#00b894,#00cec9)",color:"#fff",borderRadius:16,padding:"13px 18px",textAlign:"center",fontSize:17,fontWeight:700,marginBottom:12,boxShadow:"0 4px 14px rgba(0,184,148,.35)"},

  emptyText:{color:"#636e72",fontSize:16,textAlign:"center",padding:"14px 0",margin:0},
  histRow:{background:"#fff",borderRadius:14,padding:"11px 14px",display:"flex",alignItems:"center",marginBottom:9,boxShadow:"0 3px 10px rgba(0,0,0,.08)"},
  histLabel:{fontSize:15,fontWeight:700,color:"#2d3436"},
  histDate:{fontSize:13,color:"#636e72",marginTop:2},
  histStars:{fontSize:15,fontWeight:800,whiteSpace:"nowrap"},

  penalizeHeader:{background:"rgba(255,255,255,.55)",borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:14,boxShadow:"0 3px 12px rgba(0,0,0,.08)"},
  penCard:{background:"#fff",border:"2px solid #ffe0e0",borderRadius:20,boxShadow:"0 5px 18px rgba(0,0,0,.1)",padding:"20px 10px 14px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center"},
  cancelBtn:{display:"block",margin:"22px auto 0",background:"rgba(255,255,255,.5)",border:"none",borderRadius:14,padding:"10px 24px",fontSize:16,fontWeight:700,color:"#5f27cd",cursor:"pointer"},

  settingsHead:{width:"100%",maxWidth:640,marginTop:18,display:"flex",alignItems:"center",justifyContent:"space-between"},
  settingsTitle:{fontSize:22,fontWeight:800,color:"#2d3436"},
  card:{background:"#fff",borderRadius:20,padding:20,boxShadow:"0 5px 18px rgba(0,0,0,.1)",marginBottom:14},
  cardTitle:{margin:"0 0 12px",fontSize:17,fontWeight:800,color:"#5f27cd"},
  input:{width:"100%",padding:"11px 14px",borderRadius:12,border:"2px solid #eee",fontSize:17,fontFamily:"inherit",boxSizing:"border-box",outline:"none"},
  fieldLabel:{margin:"12px 0 6px",fontSize:14,fontWeight:700,color:"#636e72"},
  chipRow:{display:"flex",gap:6,flexWrap:"wrap"},
  chipBtn:{width:40,height:40,borderRadius:10,border:"2px solid #eee",background:"#f8f9fa",fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0},
  chipActive:{border:"3px solid #5f27cd",background:"#ede7ff"},
  starRow:{display:"flex",gap:6,flexWrap:"wrap"},
  starPick:{width:38,height:38,borderRadius:10,border:"2px solid #eee",background:"#f8f9fa",fontSize:16,fontWeight:700,color:"#636e72",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0},
  starPickActive:{border:"3px solid #e17055",background:"#fff3ee",color:"#e17055"},
  row:{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f0f0f0"},
  delBtn:{background:"none",border:"none",fontSize:20,cursor:"pointer",padding:"4px 6px",borderRadius:8},
  editBtn:{background:"none",border:"none",fontSize:18,cursor:"pointer",padding:"4px 6px",borderRadius:8},
  editorWrap:{background:"#f8f9fa",borderRadius:14,padding:14,margin:"8px 0"},
  btnFullPurple:{display:"block",width:"100%",marginTop:14,padding:"12px 0",border:"none",borderRadius:14,background:"#5f27cd",color:"#fff",fontSize:17,fontWeight:700,cursor:"pointer",boxSizing:"border-box"},
  saveBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"16px 0",border:"none",borderRadius:18,background:"linear-gradient(135deg,#00b894,#00cec9)",color:"#fff",fontSize:20,fontWeight:800,cursor:"pointer",boxShadow:"0 6px 20px rgba(0,184,148,.4)",marginBottom:14,boxSizing:"border-box"},

  langBtn:{padding:"6px 16px",borderRadius:20,border:"2px solid rgba(255,255,255,.5)",background:"rgba(255,255,255,.25)",fontSize:15,fontWeight:700,color:"#5f27cd",cursor:"pointer"},
  langBtnActive:{background:"#5f27cd",color:"#fff",border:"2px solid #5f27cd"},
  langBtnBig:{flex:1,padding:"10px 0",borderRadius:12,border:"2px solid #eee",background:"#f8f9fa",fontSize:16,fontWeight:700,color:"#636e72",cursor:"pointer"},
  langBtnBigActive:{border:"2px solid #5f27cd",background:"#ede7ff",color:"#5f27cd"},

  camCircleBtn:{width:50,height:50,borderRadius:25,background:"rgba(255,255,255,.22)",border:"none",fontSize:20,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"},

  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000},
  modal:{background:"#fff",borderRadius:24,padding:"36px 28px 28px",width:380,maxWidth:"92vw",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,.25)"},
  modalTitle:{margin:"0 0 4px",fontSize:22,fontWeight:800,color:"#2d3436"},
  modalSub:{margin:"0 0 18px",fontSize:15,color:"#636e72"},
  pwInput:{width:"100%",padding:"12px 16px",borderRadius:14,border:"2px solid #ddd",fontSize:24,textAlign:"center",fontFamily:"inherit",boxSizing:"border-box",outline:"none",letterSpacing:4},
  pwError:{color:"#e03131",fontSize:14,fontWeight:700,margin:"8px 0 0"},
  modalBtns:{display:"flex",gap:10,marginTop:20},
  btnGrey:{flex:1,padding:"12px 0",border:"none",borderRadius:14,background:"#f0f0f0",fontSize:17,fontWeight:700,color:"#636e72",cursor:"pointer"},
  btnPurple:{flex:1,padding:"12px 0",border:"none",borderRadius:14,background:"#5f27cd",color:"#fff",fontSize:17,fontWeight:700,cursor:"pointer"},
};
