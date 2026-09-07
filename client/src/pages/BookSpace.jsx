import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calculator, Check, MessageCircle, CreditCard, Copy, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/siteData';
import { enquiryService, bookingService } from '../services/api';
import usePageMeta from '../hooks/usePageMeta';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
  }),
};

const BUSINESS_TYPES = ['Manufacturing', 'Trading', 'E-commerce', 'Pharma', 'FMCG', 'Cold Storage', 'Other'];
const DURATIONS = ['1 month', '3 months', '6 months', '12 months', 'More than 12 months'];

const MIN_AREA = 500;
const MAX_AREA = 42000;
const RATE_SLABS = [
  { min: 500, max: 5000, rate: 60 },
  { min: 5001, max: 42000, rate: 24 },
];

function getRate(area) {
  const slab = RATE_SLABS.find((s) => area >= s.min && area <= s.max);
  return slab ? slab.rate : null;
}

export default function BookSpace() {
  usePageMeta('book-space');
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState('dimensions');
  const [requestId, setRequestId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: '',
    gst: '',
    startDate: '',
    duration: '',
    requirements: '',
    address: 'Gorakhpur, Uttar Pradesh',
    area: '',
    length: '',
    width: '',
    height: '',
  });

  const update = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const lengthNum = parseFloat(formData.length) || 0;
  const widthNum = parseFloat(formData.width) || 0;
  const areaInput = parseFloat(formData.area) || 0;
  const calculatedArea = method === 'dimensions' ? lengthNum * widthNum : areaInput;
  const rate = calculatedArea >= MIN_AREA && calculatedArea <= MAX_AREA ? getRate(calculatedArea) : null;
  const monthly = rate !== null ? calculatedArea * rate : 0;

  const areaError =
    calculatedArea > 0 && calculatedArea < MIN_AREA
      ? `Minimum required area is ${MIN_AREA.toLocaleString('en-IN')} sq.ft.`
      : calculatedArea > MAX_AREA
      ? 'For requirements above 42,000 sq.ft., please contact our team for a customized solution.'
      : null;

  const validateStep0 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (method === 'direct') {
      if (!formData.area || areaInput <= 0) newErrors.area = 'Required area is required';
    } else {
      if (!formData.length || lengthNum <= 0) newErrors.length = 'Length is required';
      if (!formData.width || widthNum <= 0) newErrors.width = 'Width is required';
    }
    if (!formData.height || parseFloat(formData.height) <= 0) newErrors.height = 'Height is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (areaError) {
      alert(areaError);
      return;
    }
    if (step === 0) {
      if (validateStep0()) {
        setStep(1);
      }
      return;
    }
    if (step === 1) {
      setLoading(true);
      try {
        const res = await enquiryService.submit({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          requirement: `Warehouse space - ${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.`,
          warehouseType: formData.businessType || 'General Warehouse',
          location: formData.address,
          areaRequired: `${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.`,
          message: formData.requirements,
        });
        setRequestId(res.requestId || '');
        setStep(2);
      } catch (err) {
        alert('Failed to submit enquiry. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const res = await bookingService.demoPayment({
        enquiryId: requestId,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        warehouseType: formData.businessType || 'General Warehouse',
        location: formData.address,
        areaRequired: `${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.`,
        estimatedAmount: monthly,
        paymentMethod: 'UPI',
      });
      setBookingId(res.data?.data?.bookingId || '');
      setSubmitted(true);
      setStep(3);
    } catch (err) {
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(0);
    setRequestId('');
    setBookingId('');
    setLoading(false);
    setPaymentLoading(false);
    setErrors({});
    setCopied(false);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      businessType: '',
      gst: '',
      startDate: '',
      duration: '',
      requirements: '',
      address: 'Gorakhpur, Uttar Pradesh',
      area: '',
      length: '',
      width: '',
      height: '',
    });
  };

  return (
    <div>
      <Helmet>
        <title>Book Space | Vardha Warehousing</title>
      </Helmet>
      <Hero />
      {!submitted ? (
        <section id="book-calculator" className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
          <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-5 lg:px-8">
            <motion.div className="mb-10" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="section-eyebrow">BOOK SPACE</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink">Calculate Your Warehouse Requirement</h2>
              <p className="text-sm text-steel-600 mt-2">Enter your space requirements to get an instant estimate.</p>
            </motion.div>
            <form onSubmit={handleSubmitEnquiry} className="bg-white border border-concrete-200 rounded-lg p-6 sm:p-8 shadow-[0_20px_60px_rgba(20,27,35,0.07)]">
              <div className="flex items-center gap-2 mb-8">
                {['Details', 'Review', 'Payment'].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= i ? 'bg-amber text-steel-950' : 'bg-concrete-200 text-steel-400'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs font-medium ${step >= i ? 'text-ink' : 'text-steel-400'}`}>{label}</span>
                    {i < 2 && <div className="w-8 h-px bg-concrete-200" />}
                  </div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full Name" required value={formData.fullName} onChange={update('fullName')} placeholder="Your full name" error={errors.fullName} />
                      <Field label="Company Name" value={formData.companyName} onChange={update('companyName')} placeholder="Your company" />
                      <Field label="Phone" required value={formData.phone} onChange={update('phone')} placeholder="+91 98765 43210" error={errors.phone} />
                      <Field label="Email" required type="email" value={formData.email} onChange={update('email')} placeholder="you@company.com" error={errors.email} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <SelectField label="Business Type" required value={formData.businessType} onChange={update('businessType')} options={BUSINESS_TYPES} error={errors.businessType} />
                      <Field label="GST Number (optional)" value={formData.gst} onChange={update('gst')} placeholder="22AAAAA0000A1Z5" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Required Start Date" type="date" required value={formData.startDate} onChange={update('startDate')} error={errors.startDate} />
                      <SelectField label="Required Duration" required value={formData.duration} onChange={update('duration')} options={DURATIONS} error={errors.duration} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-2">Calculation Method</label>
                      <div className="flex gap-3">
                        {[
                          { key: 'dimensions', label: 'Length × Width' },
                          { key: 'direct', label: 'Direct Area' },
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setMethod(opt.key)}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded border transition-all ${
                              method === opt.key ? 'bg-amber text-steel-950 border-amber' : 'bg-white text-ink border-concrete-200 hover:border-amber'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {method === 'direct' ? (
                      <Field label="Required Area (sq.ft.)" type="number" required value={formData.area} onChange={update('area')} placeholder="e.g. 5000" error={errors.area} />
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="Length (ft)" type="number" required value={formData.length} onChange={update('length')} placeholder="e.g. 100" error={errors.length} />
                        <Field label="Width (ft)" type="number" required value={formData.width} onChange={update('width')} placeholder="e.g. 50" error={errors.width} />
                      </div>
                    )}
                    <Field label="Height (ft)" type="number" required value={formData.height} onChange={update('height')} placeholder="e.g. 12" error={errors.height} />
                    {areaError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3">
                        {areaError}
                      </div>
                    )}
                    <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-5">
                      <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-3">Live Estimate</p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] text-steel-500 uppercase tracking-wide">Required Space</p>
                          <p className="text-sm font-semibold text-ink mt-1">{calculatedArea > 0 ? `${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.` : '-'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-steel-500 uppercase tracking-wide">Applicable Rate</p>
                          <p className="text-sm font-semibold text-ink mt-1">{rate !== null ? `₹${rate} / sq.ft.` : calculatedArea > 0 ? 'Out of range' : '-'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-steel-500 uppercase tracking-wide">Estimated Monthly</p>
                          <p className="text-sm font-semibold text-amber-700 mt-1">{monthly > 0 ? `₹${monthly.toLocaleString('en-IN')}` : '-'}</p>
                        </div>
                      </div>
                    </div>
                    <Field label="Additional Requirements" textarea value={formData.requirements} onChange={update('requirements')} placeholder="Racking preference, electricity load, special handling, etc." />
                    <div className="flex justify-end">
                      <button type="submit" className="bg-steel-900 hover:bg-steel-800 text-white px-6 py-3 text-sm font-semibold transition-colors inline-flex items-center gap-2">
                        Review Summary <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-display text-xl sm:text-2xl text-ink mb-1">Booking / Enquiry Summary</h3>
                    <p className="text-sm text-steel-500 mb-6">Please review before submitting your enquiry.</p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Summary label="Location" value={formData.address} />
                      <Summary label="Required Area" value={`${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.`} />
                      {formData.length && formData.width && <Summary label="Dimensions" value={`${formData.length} ft × ${formData.width} ft`} />}
                      <Summary label="Height" value={`${formData.height} ft`} />
                      <Summary label="Applicable Rate" value={`₹${rate} / sq.ft.`} />
                      <Summary label="Estimated Monthly Amount" value={`₹${monthly.toLocaleString('en-IN')}`} highlight />
                    </div>
                    <div className="border-t border-concrete-200 pt-6 grid sm:grid-cols-2 gap-4 mb-8">
                      <Summary label="Full Name" value={formData.fullName} />
                      <Summary label="Company" value={formData.companyName} />
                      <Summary label="Phone" value={formData.phone} />
                      <Summary label="Email" value={formData.email} />
                      <Summary label="Business Type" value={formData.businessType} />
                      <Summary label="Start Date" value={formData.startDate} />
                      <Summary label="Duration" value={formData.duration} />
                      {formData.gst && <Summary label="GST Number" value={formData.gst} />}
                      {formData.requirements && <Summary label="Additional Requirements" value={formData.requirements} full />}
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                      <button type="button" onClick={() => setStep(0)} className="text-sm font-semibold text-steel-600 hover:text-ink px-2 inline-flex items-center gap-1">
                        <ArrowLeft size={16} /> Back to Calculator
                      </button>
                      <button type="submit" disabled={loading} className="bg-amber hover:bg-amber-600 text-steel-950 px-6 py-3 text-sm font-semibold transition-colors inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-steel-950/30 border-t-steel-950 rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>Proceed to Payment <ArrowRight size={16} /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="font-display text-xl sm:text-2xl text-ink mb-1">Demo Payment</h3>
                    <p className="text-sm text-steel-500 mb-6">Complete the demo payment to confirm your booking.</p>
                    <div className="border border-concrete-200 rounded-lg p-6 mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold text-steel-500 uppercase tracking-wide">Payment Amount</span>
                        <span className="text-xs text-steel-400">Demo Mode</span>
                      </div>
                      <p className="text-4xl font-display text-ink mb-1">₹{monthly.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-steel-500 mb-8">Estimated monthly rent for {Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.</p>
                      <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-4 mb-6">
                        <p className="text-xs font-semibold text-steel-600 mb-2">Payment Method</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center">
                            <CreditCard size={20} className="text-amber" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink">UPI / Demo Payment</p>
                            <p className="text-xs text-steel-500">No real transaction will be made</p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handlePayment}
                        disabled={paymentLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 text-sm font-bold transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {paymentLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>Pay ₹{monthly.toLocaleString('en-IN')} <ArrowRight size={16} /></>
                        )}
                      </button>
                    </div>
                    <div className="flex justify-start">
                      <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-steel-600 hover:text-ink px-2 inline-flex items-center gap-1">
                        <ArrowLeft size={16} /> Back to Review
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      ) : (
        <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
          <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white border border-concrete-200 rounded-lg p-6 sm:p-10 shadow-[0_20px_60px_rgba(20,27,35,0.07)]">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
                <Check size={30} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-ink mb-2">Booking Confirmed</h3>
              <p className="text-sm text-steel-500 mb-6 max-w-md mx-auto">
                Your demo payment was successful. A confirmation has been sent to your email.
              </p>
              {bookingId && (
                <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-4 max-w-sm mx-auto mb-6">
                  <p className="text-[10px] text-steel-500 uppercase tracking-wide mb-1">Your Booking ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm font-semibold text-amber-700 font-mono">{bookingId}</p>
                    <button type="button" onClick={() => copyToClipboard(bookingId)} className="text-steel-400 hover:text-amber">
                      {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-steel-400 mt-1">Save this ID for future reference</p>
                </div>
              )}
              {requestId && (
                <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-4 max-w-sm mx-auto mb-8">
                  <p className="text-[10px] text-steel-500 uppercase tracking-wide mb-1">Your Request ID</p>
                  <p className="text-sm font-semibold text-amber-700 font-mono">{requestId}</p>
                  <p className="text-[10px] text-steel-400 mt-1">Enquiry reference ID</p>
                </div>
              )}
              <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-5 text-left grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
                <Summary label="Area" value={`${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.`} />
                <Summary label="Monthly Amount" value={`₹${monthly.toLocaleString('en-IN')}`} highlight />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={resetForm} className="text-sm font-semibold text-steel-600 hover:text-ink px-4 py-2.5 border border-concrete-200 rounded">
                  Book Another Space
                </button>
                <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1FBE5A] text-white px-6 py-3 text-sm font-semibold transition-colors">
                  <MessageCircle size={16} /> WhatsApp Vardha
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '54px 54px'
      }} />
      <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-amber/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-280px] w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 -right-20 h-40 w-[500px] rotate-[-20deg] bg-amber/5 blur-3xl animate-[floatGlow_7s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div className="flex items-center gap-3 mb-5" variants={fadeIn} initial="hidden" animate="visible">
            <span className="h-px w-10 bg-amber" />
            <span className="text-amber text-xs sm:text-sm font-semibold tracking-[0.18em]">BOOK WAREHOUSE SPACE</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Calculate your <span className="text-amber">warehouse requirement</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-6 max-w-2xl leading-relaxed text-base sm:text-lg" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Tell us your space needs and get an instant monthly estimate. Transparent pricing, no hidden costs.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-concrete-100/60" variants={fadeIn} custom={3} initial="hidden" animate="visible">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Instant estimate
            </span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>Transparent pricing</span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>No obligation
            </span>
          </motion.div>
          <motion.div className="mt-10 flex flex-wrap gap-4" variants={fadeIn} custom={4} initial="hidden" animate="visible">
            <a href="#book-calculator" className="inline-flex items-center gap-3 bg-amber hover:bg-amber-600 text-steel-950 px-7 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1">
              <Calculator size={18} />
              <span>Calculate Your Space</span>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.298-1.045 1.02-1.045 2.488 0 1.469 1.07 2.89 1.219 3.087.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
    </section>
  );
}

function Field({ label, required, type = 'text', value, onChange, placeholder, textarea, error, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      {textarea ? (
        <textarea value={value} onChange={onChange} rows={4} className={`w-full rounded border px-3 py-2.5 text-sm outline-none resize-none transition-all ${error ? 'border-red-400 bg-red-50' : 'border-concrete-200'} focus:border-amber`} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={onChange} className={`w-full rounded border px-3 py-2.5 text-sm outline-none transition-all ${error ? 'border-red-400 bg-red-50' : 'border-concrete-200'} focus:border-amber`} placeholder={placeholder} />
      )}
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, required, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <select value={value} onChange={onChange} className={`w-full rounded border px-3 py-2.5 text-sm outline-none transition-all ${error ? 'border-red-400 bg-red-50' : 'border-concrete-200'} focus:border-amber`}>
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

function Summary({ label, value, highlight, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <p className="text-xs text-steel-500 uppercase tracking-wide">{label}</p>
      <p className={`text-sm mt-0.5 ${highlight ? 'font-display text-lg text-amber-700' : 'text-ink'}`}>{value || '-'}</p>
    </div>
  );
}
