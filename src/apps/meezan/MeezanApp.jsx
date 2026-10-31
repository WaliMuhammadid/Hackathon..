import React, { useState } from 'react';
import { COLORS } from './colors';
import { useT } from '../../core/i18n';
import {
  Send,
  CreditCard,
  Receipt,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Building,
  Bell,
  LogOut,
} from 'lucide-react';

export default function MeezanApp({ onExit }) {
  const t = useT();
  const [showBalance, setShowBalance] = useState(false);
  const [screen, setScreen] = useState('home'); // 'home' | 'beneficiaries' | 'transfer' | 'success'
  const [amount, setAmount] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const beneficiaries = [
    { id: 'bilal', name: 'Bilal Bhai', bank: 'Meezan Bank', account: '0102-010349281', dataCoach: 'mz-contact-bilal' },
    { id: 'electric', name: 'K-Electric Bill', bank: 'Utility', account: '9384-2192-019', dataCoach: 'mz-contact-ke' },
    { id: 'ammi', name: 'Ammi Account', bank: 'Meezan Bank', account: '0102-099482103', dataCoach: 'mz-contact-ammi' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-[#F8F9FA] text-slate-800 select-none overflow-hidden relative">
      {/* Top Banking Header */}
      <div
        className="px-4 py-3 text-white flex items-center justify-between shadow-md shrink-0"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex items-center gap-2">
          {screen !== 'home' && (
            <button
              type="button"
              onClick={() => setScreen('home')}
              className="p-1 hover:bg-black/10 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 font-black flex items-center justify-center text-sm shadow">
            M
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide block">
              Meezan Digital
            </span>
            <span className="text-[10px] text-amber-200">
              The Premier Islamic Bank
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-slate-200" />
          <LogOut className="w-4 h-4 text-slate-200 cursor-pointer" onClick={onExit} />
        </div>
      </div>

      {/* Screen: Home View */}
      {screen === 'home' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Account Card */}
          <div
            className="rounded-2xl p-4 text-white shadow-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
            }}
          >
            <div className="flex items-center justify-between text-xs text-amber-200 mb-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                {t({ en: 'Asaan Digital Account', ur: 'آسان ڈیجیٹل اکاؤنٹ' })}
              </span>
              <span>PKR Savings</span>
            </div>

            <div className="flex items-center justify-between my-3">
              <div>
                <span className="text-xs text-slate-200 block">
                  {t({ en: 'Available Balance', ur: 'دستیاب بیلنس' })}
                </span>
                <span className="text-2xl font-bold tracking-tight">
                  {showBalance ? 'PKR 45,820.00' : 'PKR ••••••••'}
                </span>
              </div>
              <button
                type="button"
                data-coach="mz-toggle-balance"
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition"
              >
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-[11px] text-slate-300 tracking-wider">
              0102 •••• •••• 4821
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t({ en: 'Quick Services', ur: 'بینکنگ سروسز' })}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                data-coach="mz-btn-transfer"
                onClick={() => setScreen('beneficiaries')}
                className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-2 hover:border-amber-400 active:scale-95 transition"
              >
                <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center">
                  {t({ en: 'Send Money', ur: 'رقم بھیجیں' })}
                </span>
              </button>

              <button
                type="button"
                className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-2 hover:border-amber-400 active:scale-95 transition"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center">
                  {t({ en: 'Bill Pay', ur: 'بل ادا کریں' })}
                </span>
              </button>

              <button
                type="button"
                className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center gap-2 hover:border-amber-400 active:scale-95 transition"
              >
                <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center">
                  {t({ en: 'Cards', ur: 'ڈیبٹ کارڈ' })}
                </span>
              </button>
            </div>
          </div>

          {/* Recent Transactions List */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 mb-3">
              {t({ en: 'Recent Transactions', ur: 'حالیہ ادائیگیاں' })}
            </h4>
            <div className="space-y-3 divide-y divide-slate-100 text-xs">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Al-Fatah Supermarket</p>
                  <p className="text-[10px] text-slate-400">Yesterday • POS</p>
                </div>
                <span className="font-bold text-slate-800">- PKR 3,450</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">Salary Credit</p>
                  <p className="text-[10px] text-slate-400">25 Oct • Transfer</p>
                </div>
                <span className="font-bold text-emerald-600">+ PKR 50,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen: Beneficiary Selection */}
      {screen === 'beneficiaries' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-800">
            {t({ en: 'Select Payee', ur: 'وصول کنندہ کا انتخاب کریں' })}
          </h3>
          <div className="space-y-2">
            {beneficiaries.map((b) => (
              <div
                key={b.id}
                data-coach={b.dataCoach}
                onClick={() => {
                  setSelectedPerson(b);
                  setScreen('transfer');
                }}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-600 active:scale-98 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-sm">
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{b.name}</h4>
                    <span className="text-[11px] text-slate-500">{b.bank} • {b.account}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen: Amount & Confirm */}
      {screen === 'transfer' && selectedPerson && (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">
                {t({ en: 'Paying To:', ur: 'رقم وصول کنندہ:' })}
              </span>
              <p className="font-bold text-slate-900 text-base">{selectedPerson.name}</p>
              <p className="text-xs text-slate-500">{selectedPerson.bank} ({selectedPerson.account})</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="text-xs text-slate-500 font-semibold block mb-2">
                {t({ en: 'Enter Amount (PKR)', ur: 'رقم درج کریں (روپے)' })}
              </label>
              <input
                type="number"
                data-coach="mz-input-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 1000"
                className="w-full text-2xl font-bold p-2 border-b-2 border-purple-600 outline-none text-purple-950 placeholder-slate-300"
              />
            </div>
          </div>

          <button
            type="button"
            data-coach="mz-btn-pay"
            onClick={() => setScreen('success')}
            disabled={!amount}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg transition active:scale-95 ${
              amount ? 'bg-[#5B1E4E] hover:bg-[#7A2C6B]' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {t({ en: 'Pay Now', ur: 'ادائیگی کریں' })}
          </button>
        </div>
      )}

      {/* Screen: Success Receipt */}
      {screen === 'success' && (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 bg-white">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {t({ en: 'Transfer Successful!', ur: 'رقم منتقل ہو گئی!' })}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              PKR {amount || '1000'} sent to {selectedPerson?.name}
            </p>
          </div>

          <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold">MZ-98421039</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setScreen('home');
              setAmount('');
            }}
            className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-sm"
          >
            {t({ en: 'Done', ur: 'مکمل' })}
          </button>
        </div>
      )}
    </div>
  );
}
