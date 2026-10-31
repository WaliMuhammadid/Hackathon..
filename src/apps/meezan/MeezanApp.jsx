import React, { useState } from 'react';
import { COLORS } from './colors';
import { useT } from '../../core/i18n';
import {
  Send,
  Receipt,
  Smartphone,
  FileText,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  ShieldAlert,
  Bell,
  LogOut,
  Fingerprint,
  PhoneCall,
  X,
  CreditCard,
  Building,
  HelpCircle,
  Clock,
  ChevronRight,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export default function MeezanApp({ onExit }) {
  const t = useT();

  // Screen state
  // 'login' | 'dashboard' | 'send_select' | 'send_amount' | 'send_review' | 'send_otp' | 'send_receipt'
  // 'bills_select' | 'bills_input' | 'bills_receipt' | 'statement' | 'timeout'
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('demo_user');
  const [password, setPassword] = useState('pass1234');
  const [showPassword, setShowPassword] = useState(false);

  // Financial account state (simulated)
  const [balance, setBalance] = useState(48500);
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Transactions list
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Al-Fatah Supermarket', category: 'POS Purchase', amount: -2850, date: 'Today, 2:15 PM' },
    { id: 2, title: 'Salary Credit - Tech Ltd', category: 'Funds Transfer', amount: 50000, date: '28 Oct, 9:00 AM' },
    { id: 3, title: 'SSGC Gas Bill', category: 'Utility Bill', amount: -1240, date: '25 Oct, 4:30 PM' },
  ]);

  // Transfer flow states
  const [selectedBeneficiary, setSelectedBeneficiary] = useState({
    name: 'Bilal Bhai',
    bank: 'Meezan Bank Ltd',
    account: '0102-010349281',
  });
  const [transferAmount, setTransferAmount] = useState('1000');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('482910');
  const [showFakeSms, setShowFakeSms] = useState(false);
  const [showFakeCaller, setShowFakeCaller] = useState(false);

  // Bill flow states
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [consumerNumber, setConsumerNumber] = useState('1300984210981');
  const [billAmount, setBillAmount] = useState(4200);

  const beneficiaries = [
    { id: 'bilal', name: 'Bilal Bhai', bank: 'Meezan Bank Ltd', account: '0102-010349281', dataCoach: 'mz-beneficiary-bilal' },
    { id: 'ammi', name: 'Ammi Account', bank: 'Meezan Bank Ltd', account: '0102-099482103', dataCoach: 'mz-beneficiary-ammi' },
    { id: 'hbl', name: 'Tariq Mehmood', bank: 'Habib Bank Ltd (HBL)', account: '0042-790123450', dataCoach: 'mz-beneficiary-hbl' },
  ];

  const billers = [
    { id: 'kelectric', name: 'K-Electric (Electricity)', icon: '⚡', dataCoach: 'mz-biller-kelectric' },
    { id: 'ssgc', name: 'SSGC (Sui Southern Gas)', icon: '🔥', dataCoach: 'mz-biller-ssgc' },
    { id: 'stormfiber', name: 'StormFiber (Broadband)', icon: '🌐', dataCoach: 'mz-biller-stormfiber' },
  ];

  const handleLogin = () => {
    setScreen('dashboard');
  };

  const handleStartTransfer = (b) => {
    setSelectedBeneficiary(b);
    setScreen('send_amount');
  };

  const handleProceedTransfer = () => {
    // Generate new OTP & trigger fake SMS banner
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowFakeSms(true);
    setScreen('send_review');
  };

  const handleConfirmReview = () => {
    setScreen('send_otp');
    // In "Spot the danger" scenario, also trigger a fake scam caller after a brief moment
    setShowFakeCaller(true);
  };

  const handleCompleteTransfer = () => {
    const amt = parseFloat(transferAmount) || 1000;
    setBalance((prev) => Math.max(0, prev - amt));
    setTransactions((prev) => [
      {
        id: Date.now(),
        title: `Transfer to ${selectedBeneficiary.name}`,
        category: 'Instant IBFT',
        amount: -amt,
        date: 'Just now',
      },
      ...prev,
    ]);
    setShowFakeSms(false);
    setShowFakeCaller(false);
    setScreen('send_receipt');
  };

  const handleCompleteBill = () => {
    setBalance((prev) => Math.max(0, prev - billAmount));
    setTransactions((prev) => [
      {
        id: Date.now(),
        title: `Bill Paid: ${selectedBiller?.name}`,
        category: 'Utility Payment',
        amount: -billAmount,
        date: 'Just now',
      },
      ...prev,
    ]);
    setScreen('bills_receipt');
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F6FA] text-slate-800 select-none overflow-hidden relative">
      {/* Practice Badge */}
      <div className="absolute top-1 right-2 z-30 pointer-events-none bg-amber-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
        Practice Meezan
      </div>

      {/* Real-time Simulated Incoming SMS OTP Banner */}
      {showFakeSms && (
        <div className="absolute top-2 inset-x-2 z-50 bg-slate-900 text-white p-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-start gap-2.5 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-xs">
            OTP
          </div>
          <div className="flex-1 text-xs">
            <span className="font-bold text-amber-300 block">
              SMS from 8222 (Meezan Bank)
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Your One-Time Password is <strong className="text-white text-xs bg-amber-500/30 px-1 py-0.5 rounded">{generatedOtp}</strong> for transfer of PKR {transferAmount}. NEVER share with anyone.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowFakeSms(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Safety Layer: Simulated Fake Scam Caller Popup */}
      {showFakeCaller && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end p-4">
          <div className="bg-red-950 border-2 border-red-500 text-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white animate-pulse">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-red-400 text-xs font-bold block uppercase tracking-wider">
                  ⚠️ Suspicious Incoming Call
                </span>
                <h4 className="font-bold text-base text-white">Fake Bank Officer</h4>
                <p className="text-xs text-slate-300">"Hello sir, verify your account by giving me the 6-digit OTP!"</p>
              </div>
            </div>

            <div className="bg-red-900/60 p-3 rounded-xl text-xs text-red-200 border border-red-800">
              <strong className="block mb-1">🚨 Safety Rule:</strong>
              Meezan Bank officers will NEVER ask for your OTP or password over phone!
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                data-coach="mz-fake-caller-decline"
                onClick={() => setShowFakeCaller(false)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-lg active:scale-95 transition"
              >
                {t({ en: 'DECLINE & HANG UP (SAFE)', ur: 'کال کاٹ دیں (محفوظ)' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 1: Login */}
      {screen === 'login' && (
        <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
          <div className="pt-6 space-y-4">
            {/* Logo placeholder */}
            <div className="flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg mb-2"
                style={{ backgroundColor: COLORS.primary }}
              >
                M
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Meezan Digital
              </h1>
              <p className="text-xs text-amber-700 font-semibold">
                The Premier Islamic Bank
              </p>
            </div>

            {/* Practice Credentials Hint Box */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
              <span className="font-bold block mb-1">ℹ️ {t({ en: 'Practice Credentials:', ur: 'پریکٹس معلومات:' })}</span>
              <p>Username: <code className="font-bold">demo_user</code> | Password: <code className="font-bold">pass1234</code></p>
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Username / CNIC', ur: 'یوزر نیم / شناختی کارڈ نمبر' })}
                </label>
                <input
                  type="text"
                  data-coach="mz-login-user-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-purple-600 text-sm font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  {t({ en: 'Password', ur: 'پاس ورڈ' })}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    data-coach="mz-login-pass-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-10 border border-slate-300 rounded-xl outline-none focus:border-purple-600 text-sm font-semibold text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pb-4">
            <button
              type="button"
              data-coach="mz-login-btn"
              onClick={handleLogin}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg active:scale-95 transition"
              style={{ backgroundColor: COLORS.primary }}
            >
              {t({ en: 'Log In', ur: 'لاگ ان کریں' })}
            </button>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Fingerprint className="w-5 h-5 text-purple-800" />
              <span>{t({ en: 'Quick Biometric Login', ur: 'فنگر پرنٹ لاگ ان' })}</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Dashboard */}
      {screen === 'dashboard' && (
        <div className="h-full w-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <div
              className="px-4 py-3 text-white flex items-center justify-between shadow-md shrink-0"
              style={{ backgroundColor: COLORS.primary }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
                  M
                </div>
                <div>
                  <span className="font-bold text-sm tracking-wide block">
                    Assalam-o-Alaikum
                  </span>
                  <span className="text-[11px] text-amber-200">
                    Tariq Mehmood
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-200 cursor-pointer" />
                <button
                  type="button"
                  data-coach="mz-btn-simulate-timeout"
                  onClick={() => setScreen('timeout')}
                  title="Simulate safe bank automatic timeout"
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <Clock className="w-5 h-5 text-amber-300" />
                </button>
                <LogOut
                  className="w-5 h-5 text-slate-200 cursor-pointer"
                  onClick={() => setScreen('login')}
                />
              </div>
            </div>

            {/* Scrollable Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Meezan Islamic Account Card */}
              <div
                className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                }}
              >
                <div className="flex items-center justify-between text-xs text-amber-200 mb-2">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    {t({ en: 'Meezan Asaan Account', ur: 'میزان آسان اکاؤنٹ' })}
                  </span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                    Shariah Compliant
                  </span>
                </div>

                <div className="flex items-center justify-between my-3">
                  <div>
                    <span className="text-xs text-slate-200 block">
                      {t({ en: 'Available Balance', ur: 'دستیاب بیلنس' })}
                    </span>
                    <span className="text-3xl font-black tracking-tight mt-1 block">
                      {showBalance ? `PKR ${balance.toLocaleString()}.00` : 'PKR ••••••••'}
                    </span>
                  </div>
                  <button
                    type="button"
                    data-coach="mz-toggle-balance"
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition"
                  >
                    {showBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>

                <div className="text-[11px] text-slate-300 tracking-wider font-mono">
                  IBAN: PK29 MEZN 0001 0201 0349 2801
                </div>
              </div>

              {/* Quick Actions Grid (Real Meezan Style) */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  {t({ en: 'Banking Services', ur: 'بینکنگ سروسز' })}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    data-coach="mz-quick-transfer"
                    onClick={() => setScreen('send_select')}
                    className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-1.5 hover:border-purple-600 active:scale-95 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center">
                      <Send className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                      {t({ en: 'Send Money', ur: 'رقم بھیجیں' })}
                    </span>
                  </button>

                  <button
                    type="button"
                    data-coach="mz-quick-bills"
                    onClick={() => setScreen('bills_select')}
                    className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-1.5 hover:border-purple-600 active:scale-95 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                      {t({ en: 'Pay Bills', ur: 'بل ادا کریں' })}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-1.5 hover:border-purple-600 active:scale-95 transition opacity-70"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                      {t({ en: 'Top-up', ur: 'لوڈ' })}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScreen('statement')}
                    className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-1.5 hover:border-purple-600 active:scale-95 transition"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                      {t({ en: 'Statement', ur: 'اسٹیٹمنٹ' })}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-700">
                    {t({ en: 'Recent Transactions', ur: 'حالیہ ادائیگیاں' })}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setScreen('statement')}
                    className="text-xs text-purple-700 font-bold"
                  >
                    {t({ en: 'View All', ur: 'سب دیکھیں' })}
                  </button>
                </div>

                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  {transactions.slice(0, 3).map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] text-slate-400">{item.date}</p>
                      </div>
                      <span
                        className={`font-black ${
                          item.amount > 0 ? 'text-emerald-600' : 'text-slate-800'
                        }`}
                      >
                        {item.amount > 0 ? '+' : ''} PKR {Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real Meezan Bottom Nav */}
          <div className="h-14 w-full bg-white border-t border-slate-200 flex items-center justify-around px-2 text-[10px] font-bold text-slate-600 shrink-0">
            <button className="flex flex-col items-center gap-0.5 text-purple-900">
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <span className="text-lg">💳</span>
              <span>Cards</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <span className="text-lg">🏷️</span>
              <span>Discounts</span>
            </button>
            <button className="flex flex-col items-center gap-0.5">
              <span className="text-lg">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 3A: Beneficiary Select */}
      {screen === 'send_select' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div
            className="px-4 py-3 text-white flex items-center gap-3 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setScreen('dashboard')} />
            <h3 className="font-bold text-base">
              {t({ en: 'Select Beneficiary', ur: 'وصول کنندہ منتخب کریں' })}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {beneficiaries.map((b) => (
              <div
                key={b.id}
                data-coach={b.dataCoach}
                onClick={() => handleStartTransfer(b)}
                className="p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-600 active:scale-98 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-950 font-black flex items-center justify-center text-base">
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                    <span className="text-xs text-slate-500">{b.bank}</span>
                    <span className="text-[11px] text-slate-400 block font-mono">{b.account}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen 3B: Transfer Amount */}
      {screen === 'send_amount' && (
        <div className="h-full w-full flex flex-col justify-between p-4 bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 cursor-pointer text-slate-700" onClick={() => setScreen('send_select')} />
              <h3 className="font-bold text-base text-slate-900">
                {t({ en: 'Enter Transfer Amount', ur: 'رقم درج کریں' })}
              </h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 block">Transferring to:</span>
              <p className="font-bold text-sm text-slate-900">{selectedBeneficiary.name}</p>
              <p className="text-xs text-slate-500">{selectedBeneficiary.bank}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                {t({ en: 'Amount (PKR)', ur: 'رقم (روپے)' })}
              </label>
              <input
                type="number"
                data-coach="mz-input-transfer-amt"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="1000"
                className="w-full text-3xl font-black p-3 border-b-2 border-purple-800 outline-none text-purple-950"
              />
            </div>
          </div>

          <button
            type="button"
            data-coach="mz-btn-proceed-transfer"
            onClick={handleProceedTransfer}
            disabled={!transferAmount}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg active:scale-95 transition"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Proceed to Review', ur: 'جائزہ لیں' })}
          </button>
        </div>
      )}

      {/* Screen 3C: Review Transfer */}
      {screen === 'send_review' && (
        <div className="h-full w-full flex flex-col justify-between p-4 bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 cursor-pointer text-slate-700" onClick={() => setScreen('send_amount')} />
              <h3 className="font-bold text-base text-slate-900">
                {t({ en: 'Review & Confirm', ur: 'تصدیق کریں' })}
              </h3>
            </div>

            <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {t({
                  en: 'Always verify the recipient name before confirming. Transactions are irreversible.',
                  ur: 'رقم بھیجنے سے پہلے نام کی تصدیق لازمی کریں۔ بھیجی گئی رقم واپس نہیں ہو سکتی۔',
                })}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 divide-y divide-slate-200 text-xs space-y-2">
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">To Beneficiary:</span>
                <span className="font-bold text-slate-900">{selectedBeneficiary.name}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Bank:</span>
                <span>{selectedBeneficiary.bank}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500">Account:</span>
                <span className="font-mono">{selectedBeneficiary.account}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold">
                <span className="text-slate-700">Amount:</span>
                <span className="text-purple-900 font-black">PKR {parseFloat(transferAmount || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            data-coach="mz-btn-confirm-review"
            onClick={handleConfirmReview}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg active:scale-95 transition"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Confirm & Get OTP', ur: 'تصدیق اور او ٹی پی کوڈ' })}
          </button>
        </div>
      )}

      {/* Screen 3D: OTP Verification */}
      {screen === 'send_otp' && (
        <div className="h-full w-full flex flex-col justify-between p-5 bg-white">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              {t({ en: 'Enter One-Time Password (OTP)', ur: 'او ٹی پی کوڈ درج کریں' })}
            </h3>

            {/* Crucial Safety Banner */}
            <div className="bg-red-50 border border-red-300 p-3.5 rounded-2xl text-xs text-red-800 flex items-start gap-2 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-0.5 font-bold">
                  {t({ en: 'Never Share this OTP!', ur: 'او ٹی پی کسی کو نہ بتائیں!' })}
                </strong>
                {t({
                  en: 'Never share this OTP with anyone, not even someone claiming to be from the bank.',
                  ur: 'یہ خفیہ کوڈ کسی کو نہ بتائیں، خواہ وہ بینک کا مینیجر ہی کیوں نہ کہلائے۔',
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                {t({ en: '6-Digit SMS Code', ur: '6 ہندسوں کا کوڈ' })}
              </label>
              <input
                type="text"
                maxLength={6}
                data-coach="mz-input-otp"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="4 8 2 9 1 0"
                className="w-full text-center text-2xl font-mono font-bold tracking-widest p-3 border-2 border-purple-600 rounded-xl outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            data-coach="mz-btn-submit-otp"
            onClick={handleCompleteTransfer}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg active:scale-95 transition"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Submit OTP', ur: 'جمع کرائیں' })}
          </button>
        </div>
      )}

      {/* Screen 3E: Success Receipt */}
      {screen === 'send_receipt' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-white">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {t({ en: 'Transfer Successful!', ur: 'رقم کامیابی سے منتقل ہو گئی!' })}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              PKR {transferAmount} sent to {selectedBeneficiary.name}
            </p>
          </div>

          <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Reference:</span>
              <span className="font-bold">MEZN-829103841</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">New Balance:</span>
              <span className="font-bold text-emerald-600">PKR {balance.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Back to Dashboard', ur: 'ڈیش بورڈ پر واپس جائیں' })}
          </button>
        </div>
      )}

      {/* Screen 4A: Select Biller */}
      {screen === 'bills_select' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div
            className="px-4 py-3 text-white flex items-center gap-3 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setScreen('dashboard')} />
            <h3 className="font-bold text-base">
              {t({ en: 'Pay Utility Bills', ur: 'یوٹیلٹی بل ادا کریں' })}
            </h3>
          </div>

          <div className="p-4 space-y-3">
            {billers.map((b) => (
              <div
                key={b.id}
                data-coach={b.dataCoach}
                onClick={() => {
                  setSelectedBiller(b);
                  setScreen('bills_input');
                }}
                className="p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-600 active:scale-98 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <h4 className="font-bold text-sm text-slate-800">{b.name}</h4>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen 4B: Enter Consumer Number & Pay */}
      {screen === 'bills_input' && (
        <div className="h-full w-full flex flex-col justify-between p-4 bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 cursor-pointer text-slate-700" onClick={() => setScreen('bills_select')} />
              <h3 className="font-bold text-base text-slate-900">{selectedBiller?.name}</h3>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t({ en: 'Consumer Number (on Bill)', ur: 'صارف نمبر (کنزیومر نمبر)' })}
              </label>
              <input
                type="text"
                data-coach="mz-input-consumer-no"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl outline-none text-sm font-mono font-bold"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Bill Status:</span>
                <span className="font-bold text-red-600">Unpaid</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span className="text-slate-700">Amount Due:</span>
                <span className="text-purple-950 font-black">PKR {billAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            data-coach="mz-btn-pay-bill-now"
            onClick={handleCompleteBill}
            className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg active:scale-95 transition"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Pay Bill Now', ur: 'ابھی بل ادا کریں' })}
          </button>
        </div>
      )}

      {/* Screen 4C: Bill Paid Receipt */}
      {screen === 'bills_receipt' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-white">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {t({ en: 'Bill Paid Successfully!', ur: 'بل کامیابی سے ادا ہو گیا!' })}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              PKR {billAmount} paid for {selectedBiller?.name}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow"
            style={{ backgroundColor: COLORS.primary }}
          >
            {t({ en: 'Back to Dashboard', ur: 'ڈیش بورڈ پر واپس جائیں' })}
          </button>
        </div>
      )}

      {/* Screen 5: Account Statement */}
      {screen === 'statement' && (
        <div className="h-full w-full flex flex-col bg-white">
          <div
            className="px-4 py-3 text-white flex items-center gap-3 shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setScreen('dashboard')} />
            <h3 className="font-bold text-base">
              {t({ en: 'Account Statement', ur: 'بینک اسٹیٹمنٹ' })}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-4">
            {transactions.map((tr) => (
              <div key={tr.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{tr.title}</h4>
                  <span className="text-slate-400 text-[11px]">{tr.category} • {tr.date}</span>
                </div>
                <span
                  className={`font-black text-sm ${
                    tr.amount > 0 ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {tr.amount > 0 ? '+' : ''} PKR {Math.abs(tr.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen 6: Simulated Session Timeout */}
      {screen === 'timeout' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-slate-950 text-white">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {t({ en: 'Session Timed Out', ur: 'سیشن ختم ہو گیا' })}
            </h3>
            <p className="text-xs text-slate-400 mt-2 max-w-[260px] leading-relaxed">
              {t({
                en: 'For your security, you were automatically logged out due to inactivity.',
                ur: 'آپ کے اکاؤنٹ کی حفاظت کے لیے غیر فعال رہنے پر خود بخود لاگ آؤٹ کر دیا گیا ہے۔',
              })}
            </p>
          </div>

          <button
            type="button"
            data-coach="mz-timeout-relogin-btn"
            onClick={() => setScreen('login')}
            className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 font-bold text-sm shadow active:scale-95 transition"
          >
            {t({ en: 'Log In Again', ur: 'دوبارہ لاگ ان کریں' })}
          </button>
        </div>
      )}
    </div>
  );
}
