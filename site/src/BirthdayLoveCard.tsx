import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, CalendarDays, ChevronLeft, ChevronRight, Flower2, Gift, Heart, LockKeyhole, MailOpen, MapPin, MoonStar, MousePointer2, Music, PartyPopper, Play, QrCode, ScrollText, Sparkles, Stars, Video, Volume2 } from "lucide-react";

const floatingHearts = [
  { left: "8%", top: "18%", size: 18, delay: 0 },
  { left: "84%", top: "14%", size: 22, delay: 0.7 },
  { left: "15%", top: "62%", size: 15, delay: 1.2 },
  { left: "78%", top: "70%", size: 17, delay: 1.8 },
  { left: "50%", top: "10%", size: 14, delay: 2.3 },
  { left: "92%", top: "48%", size: 13, delay: 2.8 },
];

type ImageState =
  | { status: "loading" }
  | { status: "ok"; url: string }
  | { status: "empty" }
  | { status: "error" };

function useImageUrl(path: string): ImageState {
  return { status: "ok", url: path };
}

const memories = [
  { label: "Кадр 01", accent: "#f7c6d0", photoIndex: 0 },
  { label: "Кадр 02", accent: "#f8dfb4", photoIndex: 1 },
  { label: "Кадр 03", accent: "#c9d8f2", photoIndex: 2 },
  { label: "Кадр 04", accent: "#e2d0f1", photoIndex: 3 },
  { label: "Кадр 05", accent: "#cce9df", photoIndex: 4 },
  { label: "Кадр 06", accent: "#f6d6b8", photoIndex: 5 },
  { label: "Кадр 07", accent: "#d3e0f4", photoIndex: 6 },
  { label: "Кадр 08", accent: "#f1c9d5", photoIndex: 7 },
];

const celebrationBits = [
  { left: "10%", delay: 0, rotate: -18, kind: "heart" },
  { left: "23%", delay: 0.12, rotate: 12, kind: "flower" },
  { left: "38%", delay: 0.24, rotate: -8, kind: "heart" },
  { left: "52%", delay: 0.08, rotate: 18, kind: "flower" },
  { left: "67%", delay: 0.2, rotate: -14, kind: "heart" },
  { left: "81%", delay: 0.32, rotate: 10, kind: "flower" },
  { left: "92%", delay: 0.16, rotate: -6, kind: "heart" },
];

const timelineItems = [
  { title: "Первая искра", text: "Момент, с которого всё стало особенным." },
  { title: "Наши разговоры", text: "Слова, которые хотелось читать снова и снова." },
  { title: "Тёплые моменты", text: "Воспоминания, которые хочется бережно хранить." },
  { title: "Сегодня", text: "День, когда весь мир празднует тебя." },
];

const reasons = [
  "За твою улыбку, которая делает мой день светлее.",
  "За твою нежность, доброту и удивительное сердце.",
  "За то, как рядом с тобой даже обычный день становится особенным.",
  "За то, что в твоих глазах мне хочется остаться навсегда.",
  "Просто за то, что ты есть, Валерия.",
];

const finalPhrase = "ты в моей жизни означаешь больше чем просто любовь";

const gameHeartPositions = [
  { left: "8%", top: "18%" },
  { left: "42%", top: "10%" },
  { left: "78%", top: "26%" },
  { left: "23%", top: "62%" },
  { left: "68%", top: "70%" },
];

const skyStars = [
  { left: "8%", top: "22%", size: 12, delay: 0 },
  { left: "18%", top: "68%", size: 8, delay: 0.5 },
  { left: "31%", top: "35%", size: 10, delay: 1.1 },
  { left: "48%", top: "18%", size: 9, delay: 1.6 },
  { left: "62%", top: "58%", size: 13, delay: 0.8 },
  { left: "77%", top: "29%", size: 8, delay: 1.4 },
  { left: "90%", top: "72%", size: 11, delay: 2 },
];

const fallingPetals = [
  { left: "6%", delay: 0, duration: 8, rotate: 20 },
  { left: "19%", delay: 2.1, duration: 9, rotate: -18 },
  { left: "34%", delay: 1, duration: 7.5, rotate: 12 },
  { left: "52%", delay: 3, duration: 10, rotate: -25 },
  { left: "69%", delay: 1.8, duration: 8.5, rotate: 17 },
  { left: "85%", delay: 0.7, duration: 9.5, rotate: -12 },
  { left: "96%", delay: 2.8, duration: 7.8, rotate: 24 },
];

const openWhenCards = [
  { title: "Открой, когда грустно", text: "Валерия, даже в самый трудный день помни: ты очень любима, а я всегда рядом сердцем." },
  { title: "Открой, когда скучаешь", text: "Вспомни наш Дом и все тёплые моменты. Расстояние не может изменить того, что я чувствую." },
  { title: "Открой, когда нужна улыбка", text: "Улыбнись, Валерия. Твоя улыбка для меня красивее любого праздника." },
];

const moodThemes = [
  { name: "Нежность", color: "#b94668", soft: "#fff0f3" },
  { name: "Воспоминания", color: "#a26a3b", soft: "#fff4e4" },
  { name: "Мечты", color: "#5d5aa8", soft: "#f0efff" },
];

const balloons = [
  { left: "12%", top: "22%", color: "#f7c6d0" },
  { left: "34%", top: "48%", color: "#f8dfb4" },
  { left: "58%", top: "18%", color: "#c9d8f2" },
  { left: "78%", top: "44%", color: "#e2d0f1" },
];

const balloonMessages = [
  "Ты делаешь каждый мой день теплее.",
  "В тебе есть свет, который невозможно не заметить.",
  "С тобой даже тишина становится уютной.",
  "Ты заслуживаешь всего самого красивого.",
];

const wishes = [
  "Больше путешествий вдвоём",
  "Много уютных вечеров",
  "Мечты, которые сбываются",
  "Счастливые фотографии впереди",
];

const compliments = [
  "Ты невероятно красивая.",
  "Ты моё самое тёплое чувство.",
  "Рядом с тобой я становлюсь счастливее.",
  "Ты вдохновляешь меня любить сильнее.",
  "Мой любимый человек, мой Дом.",
];

export default function BirthdayLoveCard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [sparkBurst, setSparkBurst] = useState(false);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("Валерия");
  const [message, setMessage] = useState(
    "Валерия, спасибо тебе за то, что ты есть в моей жизни. Рядом с тобой обычные дни становятся особенными, а сердце находит свой дом. Я люблю твою улыбку, твою нежность и то, как ты умеешь делать мир светлее. Пусть сегодня ты почувствуешь хотя бы часть той любви, которую я к тебе испытываю."
  );
  const [showLetter, setShowLetter] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [secretNote, setSecretNote] = useState(false);
  const [selectedReason, setSelectedReason] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [foundHearts, setFoundHearts] = useState<number[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);
  const [choice, setChoice] = useState("");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState({ x: 0, y: 0, visible: false });
  const [selectedMood, setSelectedMood] = useState("Нежность");
  const [openWhen, setOpenWhen] = useState<number | null>(null);
  const [futureVisible, setFutureVisible] = useState(false);
  const [importantDate, setImportantDate] = useState("05.2025");
  const [importantPlace, setImportantPlace] = useState("Дом");
  const [startDate, setStartDate] = useState("");
  const [nightMode, setNightMode] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [secretCodeUnlocked, setSecretCodeUnlocked] = useState(false);
  const [savedMoment, setSavedMoment] = useState(false);
  const [fullFinal, setFullFinal] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [puzzleOrder, setPuzzleOrder] = useState([2, 0, 3, 1]);
  const [puzzleSelected, setPuzzleSelected] = useState<number | null>(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timerDone, setTimerDone] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [cinemaStarted, setCinemaStarted] = useState(false);
  const [complimentIndex, setComplimentIndex] = useState(0);

  const photo1 = useImageUrl("/assets/image.png");
  const photo2 = useImageUrl("/assets/image-1.png");
  const photo3 = useImageUrl("/assets/image-2.png");
  const photo4 = useImageUrl("/assets/image-3.png");
  const photo5 = useImageUrl("/assets/image-4.png");
  const photo6 = useImageUrl("/assets/image-5.png");
  const photo7 = useImageUrl("/assets/image-6.png");
  const photo8 = useImageUrl("/assets/image-7.png");
  const photoStates = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUrl = "/assets/Pepel_Nahudi_Slattcrank_-_tysyacha_prichin_79041333.mp3";

  const greeting = useMemo(() => (name.trim() ? `Для ${name.trim()}` : "Для самой любимой"), [name]);
  const daysTogether = useMemo(() => {
    if (!startDate) return null;
    const start = new Date(`${startDate}T00:00:00`);
    const today = new Date();
    const value = Math.floor((today.getTime() - start.getTime()) / 86400000);
    return Number.isFinite(value) && value >= 0 ? value : null;
  }, [startDate]);
  const progressSteps = [opened, envelopeOpen, gameComplete, giftOpen, puzzleSolved, showSurprise, showThanks];
  const progressCount = progressSteps.filter(Boolean).length;

  useEffect(() => {
    if (!envelopeOpen) {
      setTypedMessage("");
      return;
    }
    let index = 0;
    setTypedMessage("");
    const timer = window.setInterval(() => {
      index += 1;
      setTypedMessage(message.slice(0, index));
      if (index >= message.length) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [envelopeOpen, message]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(2026, 8, 3, 0, 0, 0, 0);
      const difference = target.getTime() - now.getTime();
      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setTimerDone(true);
        setIsUnlocked(true);
        return;
      }
      setTimerDone(false);
      const totalSeconds = Math.floor(difference / 1000);
      setCountdown({ days: Math.floor(totalSeconds / 86400), hours: Math.floor((totalSeconds % 86400) / 3600), minutes: Math.floor((totalSeconds % 3600) / 60), seconds: totalSeconds % 60 });
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const celebrate = () => {
    setSparkBurst(true);
    window.setTimeout(() => setSparkBurst(false), 1700);
  };

  const toggleMusic = async () => {
    if (!audioRef.current || !musicUrl) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  };

  const unlockCard = () => {
    if (password.trim() === "03.09.2007") {
      setPasswordError(false);
      setIsUnlocked(true);
      celebrate();
      return;
    }
    setPasswordError(true);
  };

  const handleGameHeart = (index: number) => {
    if (!gameActive || gameComplete || foundHearts.includes(index)) return;
    const nextScore = gameScore + 1;
    setGameScore(nextScore);
    setFoundHearts((items) => [...items, index]);
    if (nextScore >= gameHeartPositions.length) {
      setGameComplete(true);
      celebrate();
    }
  };

  const resetGame = () => {
    setGameScore(0);
    setFoundHearts([]);
    setGameComplete(false);
    setGameActive(true);
  };

  const handlePuzzleTile = (tileIndex: number) => {
    if (puzzleSolved) return;
    if (puzzleSelected === null) {
      setPuzzleSelected(tileIndex);
      return;
    }
    if (puzzleSelected === tileIndex) {
      setPuzzleSelected(null);
      return;
    }
    const nextOrder = [...puzzleOrder];
    [nextOrder[puzzleSelected], nextOrder[tileIndex]] = [nextOrder[tileIndex], nextOrder[puzzleSelected]];
    setPuzzleOrder(nextOrder);
    setPuzzleSelected(null);
    if (nextOrder.every((value, index) => value === index)) {
      setPuzzleSolved(true);
      celebrate();
    }
  };

  const resetPuzzle = () => {
    setPuzzleOrder([2, 0, 3, 1]);
    setPuzzleSelected(null);
    setPuzzleSolved(false);
  };

  if (!isUnlocked && !timerDone) {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 py-8" style={{ backgroundColor: "#171321", color: "#fff7f8" }}>
        {floatingHearts.map((heart, index) => (
          <motion.div key={index} className="pointer-events-none absolute" style={{ left: heart.left, top: heart.top }} animate={{ y: [0, -26, 0], opacity: [0.18, 0.8, 0.18], rotate: [-12, 12, -12], scale: [0.8, 1.12, 0.8] }} transition={{ duration: 4.8, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}>
            <Heart size={heart.size + 5} fill="#e98da4" color="#e98da4" strokeWidth={1.5} />
          </motion.div>
        ))}
        <motion.div className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <motion.section className="w-full rounded-3xl border p-7 text-center shadow-2xl sm:p-10" style={{ backgroundColor: "#fff8fa", borderColor: "#d87992" }} animate={{ boxShadow: ["0 20px 70px rgba(233,141,164,0.18)", "0 20px 100px rgba(233,141,164,0.46)", "0 20px 70px rgba(233,141,164,0.18)"] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
            <motion.div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: "#ffe2e9", color: "#b94668" }} animate={{ scale: [1, 1.08, 1], rotate: [0, -6, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity }}><LockKeyhole size={37} /></motion.div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Секретная открытка для Валерии</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-5xl" style={{ color: "#8f3152" }}>Откроется в день рождения</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6" style={{ color: "#765864" }}>Открытка разблокируется автоматически ровно в 00:00, 03.09.2026.</p>
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">
              {[{ label: "дни", value: countdown.days }, { label: "часы", value: countdown.hours }, { label: "минуты", value: countdown.minutes }, { label: "секунды", value: countdown.seconds }].map((item) => (
                <div key={item.label} className="rounded-2xl border p-3 sm:p-4" style={{ backgroundColor: "#fff0f3", borderColor: "#f0cbd5" }}>
                  <motion.p key={item.value} initial={{ opacity: 0, y: -7 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold sm:text-3xl" style={{ color: "#b94668" }}>{String(item.value).padStart(2, "0")}</motion.p>
                  <p className="mt-1 text-xs" style={{ color: "#a57986" }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-center gap-2 text-sm" style={{ color: "#b94668" }}><Heart size={17} fill="currentColor" /><span>Таймер идёт, сюрприз уже близко</span><Heart size={17} fill="currentColor" /></div>
          </motion.section>
        </motion.div>
      </main>
    );
  }

  if (!isUnlocked) {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 py-8" style={{ backgroundColor: "#2b1723", color: "#fff7f8" }}>
        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="pointer-events-none absolute"
            style={{ left: heart.left, top: heart.top }}
            animate={{ y: [0, -24, 0], opacity: [0.15, 0.8, 0.15], rotate: [-12, 12, -12], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 5, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={heart.size + 4} fill="#e98da4" color="#e98da4" strokeWidth={1.5} />
          </motion.div>
        ))}
        <motion.div
          className="relative z-10 mx-auto flex min-h-screen max-w-xl items-center justify-center"
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.section
            className="w-full rounded-3xl border p-7 text-center shadow-2xl sm:p-10"
            style={{ backgroundColor: "#fff8fa", borderColor: "#d87992" }}
            animate={{ boxShadow: ["0 20px 60px rgba(233,141,164,0.16)", "0 20px 80px rgba(233,141,164,0.42)", "0 20px 60px rgba(233,141,164,0.16)"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: "#ffe2e9", color: "#b94668" }}
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={38} fill="#d96382" color="#b94668" />
            </motion.div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Секретная открытка</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl" style={{ color: "#8f3152" }}>Только для тебя</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6" style={{ color: "#765864" }}>
              Введи дату рождения, чтобы открыть маленькую вселенную любви, цветов и воспоминаний.
            </p>
            <div className="mx-auto mt-7 max-w-sm text-left">
              <label htmlFor="card-password" className="mb-2 block text-sm font-medium" style={{ color: "#64434e" }}>Пароль</label>
              <input
                id="card-password"
                type="text"
                inputMode="numeric"
                value={password}
                onChange={(event) => { setPassword(event.target.value); setPasswordError(false); }}
                onKeyDown={(event) => { if (event.key === "Enter") unlockCard(); }}
                placeholder="ДД.ММ.ГГГГ"
                className="w-full rounded-xl border px-4 py-3 text-center text-lg tracking-widest outline-none transition focus:ring-2"
                style={{ borderColor: passwordError ? "#d96382" : "#eccbd3", color: "#432530", backgroundColor: "#ffffff" }}
                aria-describedby="password-hint"
              />
              <p id="password-hint" className="mt-2 text-center text-xs" style={{ color: "#a57986" }}>Введи дату в формате ДД.ММ.ГГГГ</p>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: [-7, 7, -5, 5, 0] }}
                  className="mt-3 text-center text-sm font-medium"
                  style={{ color: "#b94668" }}
                >
                  Попробуй ещё раз, любимая открытка ждёт тебя.
                </motion.p>
              )}
            </div>
            <motion.button
              type="button"
              onClick={unlockCard}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg"
              style={{ backgroundColor: "#b94668" }}
              animate={{ boxShadow: ["0 8px 18px rgba(185,70,104,0.24)", "0 10px 28px rgba(185,70,104,0.48)", "0 8px 18px rgba(185,70,104,0.24)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <LockKeyhole size={18} /> Открыть сердце
            </motion.button>
          </motion.section>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-8"
      style={{ backgroundColor: nightMode ? "#171623" : "#fff7f8", color: nightMode ? "#fff7f8" : "#432530" }}
      onMouseMove={(event) => setCursorTrail({ x: event.clientX, y: event.clientY, visible: true })}
      onMouseLeave={() => setCursorTrail((value) => ({ ...value, visible: false }))}
    >
      {cursorTrail.visible && (
        <motion.div className="pointer-events-none fixed z-50" animate={{ left: cursorTrail.x - 9, top: cursorTrail.y - 9 }} transition={{ type: "spring", stiffness: 450, damping: 24 }}>
          <MousePointer2 size={18} color="#b94668" />
        </motion.div>
      )}
      {fallingPetals.map((petal, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed top-0 z-0"
          style={{ left: petal.left, color: index % 2 === 0 ? "#e98da4" : "#f0b5c2" }}
          animate={{ y: ["-10vh", "110vh"], x: [0, index % 2 === 0 ? 30 : -24, 0], rotate: [petal.rotate, petal.rotate + 220, petal.rotate + 420], opacity: [0, 0.8, 0] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        >
          <Flower2 size={index % 2 === 0 ? 18 : 13} />
        </motion.div>
      ))}
      <div className="mx-auto max-w-3xl space-y-8">
        <AnimatePresence>
          {sparkBurst && (
            <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
              {celebrationBits.map((bit, index) => {
                const Icon = bit.kind === "flower" ? Flower2 : Heart;
                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2"
                    style={{ left: bit.left, color: bit.kind === "flower" ? "#f0a5b7" : "#d96382" }}
                    initial={{ opacity: 0, y: 0, scale: 0.4, rotate: bit.rotate }}
                    animate={{ opacity: [0, 1, 1, 0], y: [-20, -150, -260], scale: [0.4, 1.2, 0.8], rotate: [bit.rotate, bit.rotate + 45, bit.rotate + 90] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: bit.delay, ease: "easeOut" }}
                  >
                    <Icon size={index % 2 === 0 ? 25 : 21} fill={bit.kind === "heart" ? "currentColor" : "none"} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="pointer-events-none fixed z-0"
            style={{ left: heart.left, top: heart.top }}
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.9, 0.35], rotate: [-8, 8, -8] }}
            transition={{ duration: 4.5, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={heart.size} fill="#e98da4" color="#e98da4" strokeWidth={1.5} />
          </motion.div>
        ))}

        <section className="relative z-10 overflow-hidden rounded-3xl border p-6 shadow-xl sm:p-10" style={{ backgroundColor: "#fffdfd", borderColor: "#f2cbd3" }}>
          <motion.button
            type="button"
            onClick={() => setSecretNote((value) => !value)}
            className="absolute right-5 top-5 rounded-full p-2 text-pink-300"
            whileHover={{ rotate: 18, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Открыть секретную записку"
          >
            <Sparkles size={25} />
          </motion.button>
          <AnimatePresence>
            {secretNote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -8 }}
                className="absolute right-5 top-16 max-w-48 rounded-xl border p-3 text-left text-xs shadow-md"
                style={{ backgroundColor: "#fff0f3", borderColor: "#f0cbd5", color: "#8f3152" }}
              >
                Секрет: ты заслуживаешь всех цветов мира.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative z-20 flex justify-end">
            <button type="button" onClick={() => setNightMode((value) => !value)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold" style={{ backgroundColor: nightMode ? "#2f2942" : "#fff0f3", borderColor: nightMode ? "#8b719a" : "#eccbd3", color: nightMode ? "#fff7f8" : "#8f3152" }}>
              <MoonStar size={15} /> {nightMode ? "Дневной режим" : "Ночной режим"}
            </button>
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>
                Маленькая история о большой любви
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl" style={{ color: "#8f3152" }}>
                {name ? `С днём рождения, ${name}` : "С днём рождения"}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 sm:text-lg" style={{ color: "#765864" }}>
                Сегодня весь мир должен напомнить тебе, насколько ты прекрасна.
              </p>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <motion.button
                type="button"
                onClick={() => { setOpened(true); celebrate(); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                style={{ backgroundColor: "#b94668" }}
              >
                {opened ? <MailOpen size={18} /> : <LockKeyhole size={18} />}
                {opened ? "Конверт открыт" : "Открыть конверт"}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {false && opened && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-8 max-w-2xl rounded-2xl border p-5 text-center"
                style={{ backgroundColor: nightMode ? "#2f2942" : "#fff0f3", borderColor: nightMode ? "#8b719a" : "#f2cbd3", color: nightMode ? "#fff7f8" : "#8f3152" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: nightMode ? "#f0a5b7" : "#b45a73" }}>До следующего дня рождения</p>
                {timerDone ? (
                  <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <PartyPopper className="mx-auto mt-3" size={28} color="#b94668" />
                    <p className="mt-3 text-xl font-semibold">Праздник наступил</p>
                    <button type="button" onClick={() => { setFullFinal(true); celebrate(); }} className="mt-4 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>Открыть секретный экран</button>
                  </motion.div>
                ) : (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[{ label: "дни", value: countdown.days }, { label: "часы", value: countdown.hours }, { label: "минуты", value: countdown.minutes }, { label: "секунды", value: countdown.seconds }].map((item) => (
                      <div key={item.label} className="rounded-xl p-3" style={{ backgroundColor: nightMode ? "#423653" : "#ffffff" }}>
                        <motion.p key={item.value} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-semibold">{String(item.value).padStart(2, "0")}</motion.p>
                        <p className="mt-1 text-xs" style={{ color: nightMode ? "#e8cbd4" : "#a57986" }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-8 max-w-2xl rounded-2xl border p-5" style={{ backgroundColor: nightMode ? "#2f2942" : "#fffdfd", borderColor: nightMode ? "#8b719a" : "#f0d6dc", color: nightMode ? "#fff7f8" : "#8f3152" }}>
            <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: nightMode ? "#f0a5b7" : "#b45a73" }}>Путь к сюрпризу</p><p className="text-sm font-semibold">{progressCount} / {progressSteps.length}</p></div>
            <div className="mt-3 h-3 overflow-hidden rounded-full" style={{ backgroundColor: nightMode ? "#423653" : "#fff0f3" }}><motion.div className="h-full rounded-full" style={{ backgroundColor: "#d96382", width: `${(progressCount / progressSteps.length) * 100}%` }} animate={{ width: `${(progressCount / progressSteps.length) * 100}%` }} transition={{ duration: 0.45 }} /></div>
            <p className="mt-3 text-center text-xs" style={{ color: nightMode ? "#e8cbd4" : "#a57986" }}>Открывай разделы, чтобы заполнить шкалу любви.</p>
          </motion.section>

          <AnimatePresence>
            {opened && (
              <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-8 max-w-2xl rounded-2xl border p-5" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                <div className="flex items-center justify-between gap-3">
                  <div><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Поймай желание</p><h2 className="mt-1 text-xl font-semibold" style={{ color: "#8f3152" }}>Воздушные шарики с комплиментами</h2></div>
                  <Flower2 size={23} color="#d995a6" />
                </div>
                <div className="relative mt-5 h-56 overflow-hidden rounded-2xl" style={{ backgroundColor: "#fff0f3" }}>
                  {balloons.map((balloon, index) => (
                    <AnimatePresence key={index}>
                      {!poppedBalloons.includes(index) && (
                        <motion.button type="button" onClick={() => { setPoppedBalloons((items) => [...items, index]); setChoice(balloonMessages[index]); celebrate(); }} className="absolute" style={{ left: balloon.left, top: balloon.top, color: balloon.color }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: [0.9, 1.08, 0.9], y: [0, -8, 0] }} exit={{ opacity: 0, scale: 1.7, y: -35 }} transition={{ duration: 2.8, delay: index * 0.18, repeat: Infinity }} aria-label={`Лопнуть шарик ${index + 1}`}>
                          <div className="flex flex-col items-center"><Heart size={39} fill="currentColor" /><span className="mt-1 text-xs font-semibold" style={{ color: "#8f3152" }}>лопни</span></div>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  ))}
                  {poppedBalloons.length === balloons.length && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center px-8 text-center text-lg font-semibold" style={{ color: "#8f3152" }}>Все желания открыты. Пусть сбудется каждое.</motion.p>}
                </div>
                {choice && poppedBalloons.length > 0 && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm" style={{ color: "#b94668" }}>{choice}</motion.p>}
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 18 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 18 }}
                transition={{ duration: 0.45 }}
                className="mx-auto mt-10 max-w-2xl overflow-hidden"
              >
                <div className="rounded-2xl border p-5 sm:p-7" style={{ backgroundColor: "#fff4f6", borderColor: "#f3ccd5" }}>
                  <div className="flex items-center justify-center gap-3" style={{ color: "#b94668" }}>
                    <Flower2 size={20} />
                    <p className="text-lg font-semibold">{greeting}</p>
                    <Flower2 size={20} />
                  </div>
                  <p className="mt-5 text-center text-lg leading-8" style={{ color: "#643f4b" }}>
                    {message}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                      <Heart size={34} fill="#d96382" color="#d96382" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="relative z-10 space-y-5"
            >
              <div className="flex items-end justify-between gap-4 px-1">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Наши моменты</p>
                  <h2 className="mt-1 text-2xl font-semibold" style={{ color: "#8f3152" }}>Фотографии, которые хочется сохранить</h2>
                </div>
                <Stars className="shrink-0" size={25} color="#d995a6" />
              </div>

              <div
                className="grid gap-4 sm:grid-cols-3"
                onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
                onTouchEnd={(event) => {
                  if (touchStartX === null) return;
                  const delta = event.changedTouches[0].clientX - touchStartX;
                  if (Math.abs(delta) > 40) setSelectedMemory((value) => (delta < 0 ? (value + 1) % memories.length : (value - 1 + memories.length) % memories.length));
                  setTouchStartX(null);
                }}
              >
                {memories.map((memory, index) => (
                  <motion.button
                    key={memory.label}
                    type="button"
                    onClick={() => { setSelectedMemory(index); celebrate(); }}
                    whileHover={{ y: -7, rotate: index === 1 ? 0 : index === 0 ? -1 : 1, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden rounded-2xl border p-4 text-left shadow-sm"
                    style={{ backgroundColor: memory.accent, borderColor: selectedMemory === index ? "#b94668" : "#ffffff", aspectRatio: "4 / 5" }}
                  >
                    <motion.div
                      className="absolute right-3 top-3"
                      animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.25 }}
                    >
                      <Sparkles size={17} color="#ffffff" />
                    </motion.div>
                    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/80 text-center" style={{ color: "#754b59" }}>
                      {photoStates[memory.photoIndex].status === "ok" && (
                        <img src={photoStates[memory.photoIndex].url} alt={`${memory.label}, фотография Валерии`} className="h-full w-full object-contain" />
                      )}
                      {photoStates[memory.photoIndex].status === "loading" && (
                        <div className="flex flex-col items-center justify-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}><Heart size={27} fill="rgba(255,255,255,0.55)" color="#ffffff" /></motion.div><p className="mt-3 text-xs">Фото загружается</p></div>
                      )}
                      {photoStates[memory.photoIndex].status === "error" && <p className="px-3 text-xs">Не удалось загрузить фото</p>}
                      {photoStates[memory.photoIndex].status === "empty" && <p className="px-3 text-xs">Фото ещё не добавлено</p>}
                    </div>
                  </motion.button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMemory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-2xl border p-4 text-center"
                  style={{ backgroundColor: "#fff9fa", borderColor: "#f0d6dc", color: "#765864" }}
                >
                  <p className="text-sm">Выбран {memories[selectedMemory].label}. Можно перелистывать фотографии свайпом.</p>
                </motion.div>
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="relative z-10 rounded-3xl border p-6 sm:p-8"
              style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full p-3" style={{ backgroundColor: "#fff0f3", color: "#b94668" }}><ScrollText size={20} /></div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Наша история</p>
                  <h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Моменты, которые хочется помнить</h2>
                </div>
              </div>
              <div className="mt-7 space-y-4">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 * index, duration: 0.35 }}
                    className="flex items-start gap-4 rounded-2xl border p-4"
                    style={{ backgroundColor: index === timelineItems.length - 1 ? "#fff0f3" : "#fffafb", borderColor: "#f2d7de" }}
                  >
                    <motion.div
                      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#f7c6d0", color: "#8f3152" }}
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Heart size={15} fill="currentColor" />
                    </motion.div>
                    <div>
                      <p className="font-semibold" style={{ color: "#8f3152" }}>{item.title}</p>
                      <p className="mt-1 text-sm leading-6" style={{ color: "#765864" }}>{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="relative z-10 rounded-3xl border p-6 text-center sm:p-8"
              style={{ backgroundColor: "#fff3f6", borderColor: "#f0cbd5" }}
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-full max-w-sm rounded-2xl border p-5 shadow-md"
                style={{ backgroundColor: "#fffdfd", borderColor: "#ecc5d0" }}
              >
                <div className="mx-auto h-3 w-24 rounded-full" style={{ backgroundColor: "#f7c6d0" }} />
                <Heart className="mx-auto mt-5" size={30} fill="#d96382" color="#b94668" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Письмо для тебя</p>
                <AnimatePresence mode="wait">
                  {!envelopeOpen ? (
                    <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="mt-2 text-sm" style={{ color: "#765864" }}>Внутри спрятаны самые важные слова.</p>
                      <button
                        type="button"
                        onClick={() => { setEnvelopeOpen(true); celebrate(); }}
                        className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                        style={{ backgroundColor: "#b94668" }}
                      >
                        <MailOpen size={17} /> Раскрыть письмо
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <p className="mt-4 min-h-24 text-base leading-7" style={{ color: "#643f4b" }}>{typedMessage}<span className="animate-pulse" style={{ color: "#b94668" }}>▌</span></p>
                      <p className="mt-4 text-sm font-semibold" style={{ color: "#b94668" }}>С любовью, всегда.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.45 }}
              className="relative z-10 rounded-3xl border p-6 sm:p-8"
              style={{ backgroundColor: "#2f1b27", borderColor: "#6e3a4d", color: "#fff7f8" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-3" style={{ backgroundColor: "#542738", color: "#f5b3c2" }}><Music size={20} /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#f0a5b7" }}>Музыка для настроения</p>
                    <h2 className="text-xl font-semibold">Мелодия для вас двоих</h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                  style={{ backgroundColor: musicPlaying ? "#f0a5b7" : "#b94668", color: "#2f1b27" }}
                  disabled={!musicUrl}
                >
                  <Volume2 size={17} /> {musicUrl ? (musicPlaying ? "Пауза" : "Включить") : "Загрузка"}
                </button>
              </div>
              <audio ref={audioRef} src={musicUrl ?? undefined} preload="metadata" onEnded={() => setMusicPlaying(false)} />
              <div className="mt-6 flex h-16 items-end justify-center gap-1 rounded-2xl px-6" style={{ backgroundColor: "#422331" }}>
                {Array.from({ length: 28 }).map((_, index) => (
                  <motion.span
                    key={index}
                    className="w-1 rounded-full"
                    style={{ backgroundColor: index % 3 === 0 ? "#f0a5b7" : "#d96382" }}
                    animate={{ height: musicPlaying ? [8 + (index % 4) * 4, 22 + (index % 6) * 5, 10 + (index % 3) * 5] : 10 + (index % 3) * 4 }}
                    transition={{ duration: 0.65, repeat: musicPlaying ? Infinity : 0, delay: index * 0.025, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <p className="mt-3 text-center text-xs" style={{ color: "#e3b1bd" }}>
                Pepel_Nahudi_Slattcrank_-_tysyacha_prichin_79041333.mp3 уже добавлен. Нажми «Включить», чтобы запустить музыку.
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="relative z-10 rounded-3xl border p-6 sm:p-8" style={{ backgroundColor: "#ffffff", borderColor: "#f0d6dc" }}>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full p-3" style={{ backgroundColor: "#fff0f3", color: "#b94668" }}><Gift size={20} /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Персонализация</p>
              <h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Добавь свои слова</h2>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="birthday-name" className="mb-2 block text-sm font-medium" style={{ color: "#64434e" }}>Имя</label>
              <input
                id="birthday-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Например, Аня"
                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
                style={{ borderColor: "#eccbd3", color: "#432530", backgroundColor: "#fffafb" }}
              />
            </div>
            <div>
              <label htmlFor="birthday-message" className="mb-2 block text-sm font-medium" style={{ color: "#64434e" }}>Твоё послание</label>
              <textarea
                id="birthday-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:ring-2"
                style={{ borderColor: "#eccbd3", color: "#432530", backgroundColor: "#fffafb" }}
              />
            </div>
            <button
              type="button"
              onClick={() => { setOpened(true); setShowLetter(true); celebrate(); }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#b94668" }}
            >
              <Heart size={17} fill="currentColor" /> Показать послание
            </button>
            {showLetter && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm" style={{ color: "#a04e68" }}>
                Послание обновлено. Теперь оно появится в открытке.
              </motion.p>
            )}
          </div>
        </section>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45 }}
              className="relative z-10 space-y-6"
            >
              <div className="rounded-3xl border p-6 sm:p-8" style={{ backgroundColor: moodThemes.find((theme) => theme.name === selectedMood)?.soft ?? "#fff0f3", borderColor: "#f0d6dc" }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-3" style={{ backgroundColor: "rgba(255,255,255,0.72)", color: moodThemes.find((theme) => theme.name === selectedMood)?.color ?? "#b94668" }}><MoonStar size={20} /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Настроение открытки</p>
                    <h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Выбери атмосферу</h2>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {moodThemes.map((theme) => (
                    <button key={theme.name} type="button" onClick={() => { setSelectedMood(theme.name); celebrate(); }} className="rounded-full border px-4 py-2 text-sm font-semibold transition" style={{ backgroundColor: selectedMood === theme.name ? theme.color : "rgba(255,255,255,0.72)", borderColor: selectedMood === theme.name ? theme.color : "#eccbd3", color: selectedMood === theme.name ? "#ffffff" : "#765864" }}>{theme.name}</button>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 rounded-2xl border p-2" style={{ backgroundColor: "rgba(255,255,255,0.62)", borderColor: "rgba(236,203,211,0.8)" }}>
                  {["Письмо", "Воспоминания", "Будущее"].map((chapter) => (
                    <button key={chapter} type="button" onClick={() => setChoice(`Открыт раздел: ${chapter}`)} className="flex-1 rounded-xl px-3 py-2 text-sm font-medium" style={{ backgroundColor: choice === `Открыт раздел: ${chapter}` ? "#ffffff" : "transparent", color: "#8f3152" }}>{chapter}</button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border p-6 sm:p-8" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Интерактивный пазл</p><h2 className="mt-1 text-xl font-semibold" style={{ color: "#8f3152" }}>Собери вашу историю</h2></div>
                  <p className="text-sm" style={{ color: "#a57986" }}>{puzzleSolved ? "Готово" : "Меняй местами два кадра"}</p>
                </div>
                <div className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-2 rounded-2xl p-2" style={{ backgroundColor: "#fff0f3" }}>
                  {puzzleOrder.map((photoIndex, tileIndex) => (
                    <button key={tileIndex} type="button" onClick={() => handlePuzzleTile(tileIndex)} className="relative aspect-square overflow-hidden rounded-xl border-4" style={{ borderColor: puzzleSelected === tileIndex ? "#b94668" : "#ffffff", backgroundColor: memories[photoIndex].accent }} aria-label={`Пазл, часть ${tileIndex + 1}`}>
                      {photoStates[photoIndex].status === "ok" ? <img src={photoStates[photoIndex].url} alt={`Часть пазла, ${memories[photoIndex].label}`} className="h-full w-full object-contain" /> : <Heart className="mx-auto" size={25} color="#ffffff" fill="rgba(255,255,255,0.55)" />}
                      {puzzleSelected === tileIndex && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0" style={{ backgroundColor: "rgba(185,70,104,0.18)" }} />}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button type="button" onClick={resetPuzzle} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#eccbd3", color: "#b94668" }}>Перемешать</button>
                  {puzzleSolved && <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-sm font-semibold" style={{ color: "#b94668" }}>Фотографии сложились в один тёплый момент.</motion.p>}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border p-6 shadow-lg sm:p-8"
                style={{ backgroundColor: "#2a1a31", borderColor: "#69436d", color: "#fff7f8" }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setParallax({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
                }}
                onMouseLeave={() => setParallax({ x: 0, y: 0 })}
              >
                <motion.div className="absolute inset-0" style={{ transform: `translate(${parallax.x * 14}px, ${parallax.y * 14}px)` }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
                  {skyStars.map((star, index) => (
                    <motion.div key={index} className="absolute" style={{ left: star.left, top: star.top }} animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8] }} transition={{ duration: 2.8, delay: star.delay, repeat: Infinity }}>
                      <Sparkles size={star.size} color="#f7c6d0" />
                    </motion.div>
                  ))}
                  <motion.div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: "rgba(217,99,130,0.16)" }} animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 3.5, repeat: Infinity }} />
                </motion.div>
                <div className="relative text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#f0a5b7" }}>Звёздное небо</p>
                  <h2 className="mt-2 text-2xl font-semibold">Ты сияешь ярче всех звёзд</h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "#e8cbd4" }}>Наведи курсор на небо и посмотри, как оно оживает.</p>
                </div>
              </div>

              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                <div className="rounded-3xl border p-6" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Маленькая игра</p>
                      <h2 className="mt-1 text-xl font-semibold" style={{ color: "#8f3152" }}>Собери сердечки</h2>
                    </div>
                    <p className="rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: "#fff0f3", color: "#b94668" }}>{gameScore} / {gameHeartPositions.length}</p>
                  </div>
                  <div className="relative mt-5 h-52 overflow-hidden rounded-2xl" style={{ backgroundColor: "#fff0f3" }}>
                    {!gameActive && !gameComplete && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
                        <Heart size={31} fill="#d96382" color="#b94668" />
                        <p className="mt-3 text-sm" style={{ color: "#765864" }}>Найди пять сердечек, чтобы открыть сюрприз.</p>
                      </div>
                    )}
                    {gameHeartPositions.map((position, index) => (
                      <AnimatePresence key={index}>
                        {gameActive && !foundHearts.includes(index) && (
                          <motion.button
                            type="button"
                            onClick={() => handleGameHeart(index)}
                            className="absolute rounded-full p-2"
                            style={{ left: position.left, top: position.top }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: [0.85, 1.12, 0.85], rotate: [-8, 8, -8] }}
                            exit={{ opacity: 0, scale: 1.8, y: -20 }}
                            transition={{ duration: 4.8, repeat: Infinity, delay: index * 0.45, ease: "easeInOut" }}
                            aria-label={`Сердечко ${index + 1}`}
                          >
                            <Heart size={24} fill="#d96382" color="#b94668" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    ))}
                    {gameComplete && (
                      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <PartyPopper size={30} color="#b94668" />
                        <p className="mt-3 font-semibold" style={{ color: "#8f3152" }}>Ты собрала всю любовь.</p>
                        <p className="mt-1 text-sm" style={{ color: "#765864" }}>Сюрприз уже ждёт в финале.</p>
                      </motion.div>
                    )}
                  </div>
                  <button type="button" onClick={resetGame} className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>
                    <Play size={16} /> {gameActive ? "Начать заново" : "Начать игру"}
                  </button>
                </div>

                <div className="rounded-3xl border p-6" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Причины любви</p>
                      <h2 className="mt-1 text-xl font-semibold" style={{ color: "#8f3152" }}>Ещё одна причина</h2>
                    </div>
                    <Heart size={22} fill="#d96382" color="#b94668" />
                  </div>
                  <motion.div key={selectedReason} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="mt-8 flex min-h-32 items-center justify-center rounded-2xl px-5 text-center" style={{ backgroundColor: "#fff0f3", color: "#643f4b" }}>
                    <p className="text-lg leading-8">{reasons[selectedReason]}</p>
                  </motion.div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setSelectedReason((selectedReason - 1 + reasons.length) % reasons.length)} className="rounded-full border p-3" style={{ borderColor: "#eccbd3", color: "#b94668" }} aria-label="Предыдущая причина"><ChevronLeft size={18} /></button>
                    <p className="text-xs" style={{ color: "#a57986" }}>{selectedReason + 1} из {reasons.length}</p>
                    <button type="button" onClick={() => setSelectedReason((selectedReason + 1) % reasons.length)} className="rounded-full border p-3" style={{ borderColor: "#eccbd3", color: "#b94668" }} aria-label="Следующая причина"><ChevronRight size={18} /></button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                <div className="rounded-3xl border p-6 text-center" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <AnimatePresence mode="wait">
                    {!cinemaStarted ? (
                      <motion.div key="cinema-closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Video className="mx-auto" size={28} color="#b94668" />
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Кинематографичное начало</p>
                        <h2 className="mt-2 text-xl font-semibold" style={{ color: "#8f3152" }}>История Валерии</h2>
                        <p className="mt-3 text-sm leading-6" style={{ color: "#765864" }}>Нажми, чтобы запустить вступление к вашему видео.</p>
                        <button type="button" onClick={() => { setCinemaStarted(true); celebrate(); }} className="mt-4 rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#eccbd3", color: "#b94668" }}><Play className="mr-2 inline" size={15} /> Запустить историю</button>
                      </motion.div>
                    ) : (
                      <motion.div key="cinema-open" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="relative overflow-hidden rounded-2xl" style={{ backgroundColor: "#2f1b27" }}>
                          {photoStates[0].status === "ok" && <img src={photoStates[0].url} alt="Кинематографичное вступление для Валерии" className="h-40 w-full object-contain opacity-70" />}
                          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: "rgba(47,27,39,0.52)", color: "#ffffff" }}><Video size={26} color="#ffd7df" /><p className="mt-3 text-lg font-semibold">История Валерии</p><p className="mt-1 text-xs" style={{ color: "#ffe9ee" }}>Видео-воспоминание появится здесь</p></div>
                        </div>
                        <button type="button" onClick={() => setCinemaStarted(false)} className="mt-4 rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#eccbd3", color: "#b94668" }}>Перезапустить вступление</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="rounded-3xl border p-6 text-center" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="mx-auto grid h-24 w-24 grid-cols-6 gap-1 rounded-xl border-4 p-2" style={{ borderColor: "#8f3152", backgroundColor: "#ffffff" }}>
                    {Array.from({ length: 36 }).map((_, index) => <span key={index} className="rounded-sm" style={{ backgroundColor: (index * 7 + 3) % 5 < 2 ? "#8f3152" : "#ffffff" }} />)}
                  </div>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}><QrCode size={15} /> QR-подарок</p>
                  <h2 className="mt-2 text-xl font-semibold" style={{ color: "#8f3152" }}>Открытка в одном сканировании</h2>
                  <p className="mt-3 text-sm leading-6" style={{ color: "#765864" }}>После публикации сюда можно добавить настоящий QR-код со ссылкой на открытку.</p>
                </div>
              </div>

              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                <div className="rounded-3xl border p-6" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="flex items-center gap-3">
                    <BookOpen size={22} color="#b94668" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Секретные письма</p>
                      <h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Открой, когда…</h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    {openWhenCards.map((card, index) => (
                      <div key={card.title}>
                        <button type="button" onClick={() => setOpenWhen(openWhen === index ? null : index)} className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold" style={{ backgroundColor: openWhen === index ? "#fff0f3" : "#fffafb", borderColor: "#eccbd3", color: "#8f3152" }}>
                          <span>{card.title}</span><Heart size={16} fill={openWhen === index ? "#d96382" : "none"} color="#b94668" />
                        </button>
                        <AnimatePresence>
                          {openWhen === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-4 py-3 text-sm leading-6" style={{ color: "#765864" }}>{card.text}</motion.p>}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border p-6" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="flex items-center gap-3">
                    <CalendarDays size={22} color="#b94668" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Ваши ориентиры</p>
                      <h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Важные детали</h2>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <input type="text" value={importantDate} onChange={(event) => setImportantDate(event.target.value)} placeholder="Важная дата" className="w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#eccbd3", backgroundColor: "#fffafb", color: "#432530" }} />
                    <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#eccbd3", backgroundColor: "#fffafb", color: "#432530" }} aria-label="Дата начала отношений" />
                    <div className="flex items-center gap-2">
                      <MapPin size={18} color="#b94668" />
                      <input value={importantPlace} onChange={(event) => setImportantPlace(event.target.value)} placeholder="Особенное место" className="w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: "#eccbd3", backgroundColor: "#fffafb", color: "#432530" }} />
                    </div>
                    <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: "#fff0f3", color: "#765864" }}>
                      <p className="text-sm">{importantDate || "Укажи важную дату"}</p>
                      <p className="mt-1 text-sm">{importantPlace || "и место, которое дорого вам двоим"}</p>
                      {daysTogether !== null && <p className="mt-3 text-lg font-semibold" style={{ color: "#b94668" }}>{daysTogether} дней вместе</p>}
                    </div>
                    <button type="button" onClick={() => setFutureVisible((value) => !value)} className="w-full rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>{futureVisible ? "Скрыть наше будущее" : "Открыть наше будущее"}</button>
                    <AnimatePresence>
                      {futureVisible && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm leading-6" style={{ color: "#8f3152" }}>Пусть впереди будет ещё больше мест, дат и счастливых историй.</motion.p>}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                <div className="rounded-3xl border p-6 text-center" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <motion.div animate={giftOpen ? { rotate: [0, -8, 8, 0], scale: [1, 1.18, 1] } : { y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: giftOpen ? 0 : Infinity }}>
                    <Gift className="mx-auto" size={44} color="#b94668" />
                  </motion.div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Подарочная коробка</p>
                  <h2 className="mt-2 text-xl font-semibold" style={{ color: "#8f3152" }}>Внутри кое-что важное</h2>
                  <button type="button" onClick={() => { setGiftOpen((value) => !value); celebrate(); }} className="mt-4 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>{giftOpen ? "Закрыть подарок" : "Открыть подарок"}</button>
                  <AnimatePresence>
                    {giftOpen && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm leading-6" style={{ color: "#765864" }}>Твой подарок внутри: ещё один повод улыбнуться и почувствовать мою любовь.</motion.p>}
                  </AnimatePresence>
                  <div className="mt-5 border-t pt-5" style={{ borderColor: "#f0d6dc" }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Секретный код любви</p>
                    <div className="mt-3 flex gap-2">
                      <input value={secretCode} onChange={(event) => { setSecretCode(event.target.value); setSecretCodeUnlocked(false); }} placeholder="Введи код" className="min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm outline-none" style={{ borderColor: "#eccbd3", backgroundColor: "#fffafb", color: "#432530" }} />
                      <button type="button" onClick={() => { if (secretCode.trim().toUpperCase() === "КИТЯ") { setSecretCodeUnlocked(true); celebrate(); } }} className="rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>Проверить</button>
                    </div>
                    {secretCodeUnlocked && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm font-semibold" style={{ color: "#b94668" }}>Секрет открыт: любовь побеждает всё.</motion.p>}
                  </div>
                </div>

                <div className="rounded-3xl border p-6" style={{ backgroundColor: "#fffdfd", borderColor: "#f0d6dc" }}>
                  <div className="flex items-center gap-3"><Heart size={22} fill="#d96382" color="#b94668" /><div><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Полароидная лента</p><h2 className="text-xl font-semibold" style={{ color: "#8f3152" }}>Кадры вашей истории</h2></div></div>
                  <div className="relative mt-6 h-48 overflow-hidden rounded-2xl" style={{ backgroundColor: "#fff0f3" }}>
                    {memories.map((memory, index) => (
                      <motion.div key={memory.label} className="absolute w-28 rounded-md border-4 border-white p-2 shadow-lg" style={{ left: `${14 + index * 28}%`, top: `${18 + (index % 2) * 22}%`, backgroundColor: memory.accent }} animate={{ y: [0, -8, 0], rotate: [index - 1, index - 2, index - 1] }} transition={{ duration: 3.2, delay: index * 0.4, repeat: Infinity }}>
                        <div className="flex aspect-square items-center justify-center overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.35)" }}>
                          {photoStates[memory.photoIndex].status === "ok" ? <img src={photoStates[memory.photoIndex].url} alt={`${memory.label}, полароид`} className="h-full w-full object-contain" /> : <Heart size={22} color="#ffffff" fill="rgba(255,255,255,0.55)" />}
                        </div>
                        <p className="mt-2 text-center text-xs" style={{ color: "#754b59" }}>{memory.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6" style={{ color: "#765864" }}>Загруженные фотографии можно будет разместить в этих полароидах.</p>
                </div>
              </div>

              <div className="rounded-3xl border p-6 text-center" style={{ backgroundColor: "#fff7f8", borderColor: "#f0cbd5" }}>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Твоя подпись</p>
                <AnimatePresence mode="wait">
                  {!signatureVisible ? (
                    <motion.button key="show" type="button" onClick={() => setSignatureVisible(true)} whileHover={{ scale: 1.04 }} className="mt-4 rounded-full px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>Показать подпись</motion.button>
                  ) : (
                    <motion.p key="signature" initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} className="mt-4 text-4xl" style={{ color: "#8f3152", fontFamily: "cursive" }}>С любовью</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.45 }} className="relative z-10 rounded-3xl border p-7 text-center sm:p-10" style={{ backgroundColor: "#fff0f3", borderColor: "#f0cbd5" }}>
              <motion.div animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity }}><Heart className="mx-auto" size={38} fill="#d96382" color="#b94668" /></motion.div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: "#b45a73" }}>Страница благодарности</p>
              <h2 className="mt-2 text-3xl font-semibold" style={{ color: "#8f3152" }}>Спасибо, что ты есть</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8" style={{ color: "#643f4b" }}>Спасибо тебе за улыбки, тепло и за то, что рядом с тобой я чувствую себя по-настоящему счастливым. Пусть эта открытка напомнит, как много ты значишь для меня.</p>
              <button type="button" onClick={() => { setShowThanks(true); celebrate(); }} className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: "#b94668" }}>Открыть благодарность</button>
              <AnimatePresence>
                {showThanks && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-lg font-semibold" style={{ color: "#b94668" }}>Валерия, ты моё самое дорогое чудо.</motion.p>}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.section
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="relative z-10 overflow-hidden rounded-3xl border p-8 text-center shadow-xl sm:p-12"
              style={{ backgroundColor: "#8f3152", borderColor: "#b94668", color: "#fff7f8" }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{ opacity: [0.18, 0.4, 0.18], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundColor: "#b94668" }}
              />
              <div className="relative">
                <motion.div animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }} transition={{ duration: 2.4, repeat: Infinity }}>
                  <PartyPopper className="mx-auto" size={42} color="#ffd7df" />
                </motion.div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: "#ffd7df" }}>Финальный сюрприз</p>
                <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Ты моё самое красивое чудо</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7" style={{ color: "#ffe9ee" }}>
                  {finalPhrase}. Нажми на кнопку, чтобы выпустить все сердечки, цветы и искры этой открытки.
                </p>
                <motion.button
                  type="button"
                  onClick={() => { setShowSurprise(true); celebrate(); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ backgroundColor: "#fff7f8", color: "#8f3152" }}
                >
                  <Heart size={17} fill="currentColor" /> Открыть финал
                </motion.button>
                <AnimatePresence>
                  {showSurprise && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                      <p className="text-xl font-semibold" style={{ color: "#ffd7df" }}>Я люблю тебя очень сильно.</p>
                      <div className="mt-5 flex flex-wrap justify-center gap-3">
                        <button type="button" onClick={() => setChoice("Обнимаю тебя всем сердцем.")} className="rounded-full px-5 py-3 text-sm font-semibold" style={{ backgroundColor: "#fff7f8", color: "#8f3152" }}>Обнять</button>
                        <button type="button" onClick={() => { setChoice("Тогда держи ещё одну порцию любви."); celebrate(); }} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#ffd7df", color: "#fff7f8" }}>Ещё сюрприз</button>
                      </div>
                      {choice && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm" style={{ color: "#ffe9ee" }}>{choice}</motion.p>}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setSavedMoment(true)} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#ffd7df", color: "#fff7f8" }}>Сохранить этот момент</button>
                  <button type="button" onClick={() => setFullFinal(true)} className="rounded-full px-5 py-3 text-sm font-semibold" style={{ backgroundColor: "#fff7f8", color: "#8f3152" }}>Полный экран</button>
                  <button type="button" onClick={() => window.print()} className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: "#ffd7df", color: "#fff7f8" }}>Скачать открытку</button>
                </div>
                {savedMoment && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm" style={{ color: "#ffe9ee" }}>Этот момент сохранён в памяти открытки.</motion.p>}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {fullFinal && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6 text-center" style={{ backgroundColor: "#301723", color: "#fff7f8" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {celebrationBits.map((bit, index) => {
                const Icon = bit.kind === "flower" ? Flower2 : Heart;
                return <motion.div key={index} className="absolute" style={{ left: bit.left, top: `${18 + (index % 4) * 18}%`, color: bit.kind === "flower" ? "#f0a5b7" : "#d96382" }} animate={{ y: [0, -26, 0], rotate: [bit.rotate, bit.rotate + 30, bit.rotate], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2.8, delay: bit.delay, repeat: Infinity }}><Icon size={index % 2 === 0 ? 30 : 24} fill={bit.kind === "heart" ? "currentColor" : "none"} /></motion.div>;
              })}
              <div className="relative max-w-2xl">
                <Stars className="mx-auto" size={42} color="#ffd7df" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "#f0a5b7" }}>Только для тебя</p>
                <h2 className="mt-3 text-4xl font-semibold sm:text-6xl">Я люблю тебя, Валерия</h2>
                <p className="mt-5 text-lg leading-8" style={{ color: "#ffe9ee" }}>{finalPhrase}.</p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 text-xs uppercase tracking-wide" style={{ color: "#f0a5b7" }}>Для Валерии • 03.09.2007 • С любовью</motion.div>
                <button type="button" onClick={() => setFullFinal(false)} className="mt-8 rounded-full px-6 py-3 text-sm font-semibold" style={{ backgroundColor: "#fff7f8", color: "#8f3152" }}>Вернуться к открытке</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="relative z-10 pb-4 text-center text-sm" style={{ color: "#a57986" }}>
          Сделано с любовью, чтобы один день стал особенным.
        </p>
      </div>
    </main>
  );
}
