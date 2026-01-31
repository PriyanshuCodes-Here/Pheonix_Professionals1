import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

/* ✅ STATIC JSON IMPORT (VITE SAFE) */
import servicesData from "../../data/services.json";

/* 🎯 EMOJI/STICKER OPTIONS (केवल यहाँ से सिलेक्ट करें) */
const EMOJI_OPTIONS = [
  "💼", "📊", "🚀", "🎯", "⭐", "🔥", "💡", "🛡️", 
  "⚡", "🎨", "🔧", "📈", "🔒", "🌐", "🤝", "🏆",
  "💰", "👑", "✨", "🎪", "📱", "💻", "🔑", "🏅",
  "🎭", "🧩", "📦", "🔔", "📝", "🎓", "🧠", "🔄"
];

/* 🔒 LOCKED EMPTY SERVICE STRUCTURE (ICON REMOVED) */
const EMPTY_SERVICE = {
  title: "",
  description: "",
  items: ["", "", ""], // EXACTLY 3 (LOCKED)
  highlight: "",
  stat: "",
  sticker: "💼" // DEFAULT STICKER
};

/* 🔒 STRICT VALIDATION BEFORE SAVE (ICON REMOVED) */
const validateServices = (services) => {
  return services.every(
    (service) =>
      service.title &&
      service.description &&
      service.highlight &&
      service.stat &&
      service.sticker &&
      Array.isArray(service.items) &&
      service.items.length === 3 &&
      service.items.every(
        (item) => typeof item === "string" && item.trim() !== ""
      )
  );
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null); // null or index

  useEffect(() => {
    // OLD JSON में icon था, नए में sticker है - बैकवर्ड कंपैटिबिलिटी
    const existingServices = Array.isArray(servicesData?.services)
      ? servicesData.services.map(service => ({
          ...service,
          // अगर icon है तो उसे sticker में बदलें, नहीं तो default sticker
          sticker: service.icon || "💼"
        }))
      : [];

    setServices(existingServices);
    setLoading(false);
  }, []);

  const updateService = (index, key, value) => {
    const updated = [...services];
    updated[index][key] = value;
    setServices(updated);
  };

  const updateItem = (serviceIndex, itemIndex, value) => {
    const updated = [...services];
    updated[serviceIndex].items[itemIndex] = value;
    setServices(updated);
  };

  const addService = () => {
    setServices([...services, { ...EMPTY_SERVICE }]);
  };

  /* 🗑️ DELETE COMPLETE SERVICE CARD */
  const deleteService = (index) => {
    if (window.confirm(`Are you sure you want to delete Service ${index + 1}? This action cannot be undone.`)) {
      const updated = [...services];
      updated.splice(index, 1);
      setServices(updated);
    }
  };

  /* 🎯 SELECT STICKER FOR SERVICE */
  const selectSticker = (serviceIndex, sticker) => {
    updateService(serviceIndex, "sticker", sticker);
    setShowEmojiPicker(null);
  };

  const saveAll = async () => {
    if (!validateServices(services)) {
      alert(
        "❌ Each service must have ALL fields and EXACTLY 3 items.\nPartial or invalid cards are not allowed."
      );
      return;
    }

    try {
      setSaving(true);
      // स्टिकर को JSON में सेव करें (आइकन नहीं)
      await axios.post("http://localhost:5001/api/services", {
        services: services.map(service => ({
          title: service.title,
          description: service.description,
          items: service.items,
          highlight: service.highlight,
          stat: service.stat,
          sticker: service.sticker // सिर्फ स्टिकर भेजें
        }))
      });
      alert("✅ Services JSON saved successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save services.json");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading services from JSON...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      <AdminNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Services Management
          </h1>
          <p className="text-gray-600">Manage your services with beautiful stickers & easy editing</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {services.map((service, i) => (
          <div
            key={i}
            className="group relative mb-10"
          >
            {/* SERIAL NUMBER BADGE WITH DELETE BUTTON */}
            <div className="absolute -left-4 -top-4 z-10 flex items-start gap-2">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl rotate-12 shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">#{i + 1}</span>
                </div>
              </div>
              
              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteService(i)}
                className="
                  w-10 h-10
                  bg-gradient-to-r from-red-500 to-pink-600
                  text-white
                  rounded-xl
                  shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                  flex items-center justify-center
                  group/delete
                "
                title="Delete this service card"
              >
                <span className="text-lg group-hover/delete:rotate-90 transition-transform">🗑️</span>
              </button>
            </div>

            {/* CARD */}
            <div className="
              bg-white
              p-8
              sm:p-10
              rounded-2xl
              border border-gray-200
              shadow-xl
              hover:shadow-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              relative
              overflow-hidden
            ">
              {/* DECORATIVE ELEMENTS */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full translate-y-12 -translate-x-12 opacity-50 group-hover:opacity-70 transition-opacity"></div>

              <div className="relative z-10">
                {/* SECTION HEADER WITH STICKER SELECTOR */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    {/* STICKER SELECTOR */}
                    <div className="relative">
                      <button
                        onClick={() => setShowEmojiPicker(showEmojiPicker === i ? null : i)}
                        className="
                          w-16 h-16
                          rounded-2xl
                          bg-gradient-to-br from-blue-100 to-purple-100
                          flex items-center justify-center
                          text-3xl
                          hover:from-blue-200 hover:to-purple-200
                          hover:scale-105
                          transition-all
                          duration-300
                          shadow-md
                          hover:shadow-lg
                        "
                      >
                        {service.sticker}
                      </button>
                      
                      {/* EMOJI PICKER */}
                      {showEmojiPicker === i && (
                        <div className="
                          absolute
                          top-full
                          left-0
                          mt-2
                          bg-white
                          rounded-2xl
                          shadow-2xl
                          border border-gray-200
                          p-4
                          z-50
                          w-64
                          max-h-80
                          overflow-y-auto
                        ">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-800">Choose a Sticker</h4>
                            <button 
                              onClick={() => setShowEmojiPicker(null)}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="grid grid-cols-6 gap-2">
                            {EMOJI_OPTIONS.map((emoji, idx) => (
                              <button
                                key={idx}
                                onClick={() => selectSticker(i, emoji)}
                                className="
                                  w-10 h-10
                                  rounded-xl
                                  text-2xl
                                  hover:bg-gray-100
                                  hover:scale-110
                                  transition-all
                                  duration-200
                                  flex items-center justify-center
                                "
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                          <div className="mt-3 text-xs text-gray-500 text-center">
                            Click to select sticker
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Service {i + 1}
                      </h3>
                      <p className="text-gray-500 text-sm">Edit details below</p>
                    </div>
                  </div>
                  
                  {/* STATUS INDICATOR */}
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${validateServices([service]) 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                    }
                  `}>
                    {validateServices([service]) ? 'Complete ✓' : 'Incomplete'}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* LEFT COLUMN */}
                  <div className="space-y-6">
                    {/* TITLE */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Title
                      </label>
                      <input
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 font-medium"
                        placeholder="Service Title"
                        value={service.title}
                        onChange={(e) =>
                          updateService(i, "title", e.target.value)
                        }
                      />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Description
                      </label>
                      <textarea
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-green-500/30 focus:border-green-500 transition-all duration-200 hover:border-green-400 min-h-[120px]"
                        placeholder="Detailed description of the service..."
                        value={service.description}
                        onChange={(e) =>
                          updateService(i, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-6">
                    {/* ITEMS - EXACTLY 3 */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          Feature Items (Exactly 3)
                        </span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                          Required: 3 items
                        </span>
                      </label>
                      
                      <div className="space-y-4">
                        {service.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0 group-hover/item:from-orange-200 group-hover/item:to-yellow-200 transition-all">
                              {idx + 1}
                            </div>
                            <input
                              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-200 hover:border-orange-400"
                              placeholder={`Feature ${idx + 1} description...`}
                              value={item}
                              onChange={(e) =>
                                updateItem(i, idx, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HIGHLIGHT & STAT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          Highlight
                        </label>
                        <input
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-200 hover:border-pink-400"
                          placeholder="Key highlight"
                          value={service.highlight}
                          onChange={(e) =>
                            updateService(i, "highlight", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                          Stat
                        </label>
                        <input
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400"
                          placeholder="e.g., 99.8% Accuracy"
                          value={service.stat}
                          onChange={(e) =>
                            updateService(i, "stat", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* STICKER PREVIEW */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-800">Current Sticker</h4>
                        <button
                          onClick={() => setShowEmojiPicker(i)}
                          className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition"
                        >
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-5xl">{service.sticker}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ACTION BUTTONS */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={addService}
              className="
                px-8 py-4
                rounded-xl
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
                transition-all
                duration-300
                hover:from-blue-600 hover:to-purple-700
                active:translate-y-0
                flex items-center gap-3
                group
              "
            >
              <span className="text-xl group-hover:scale-110 transition-transform">+</span>
              <span>Add New Service</span>
            </button>

            <button
              onClick={saveAll}
              disabled={saving}
              className="
                px-8 py-4
                rounded-xl
                bg-gradient-to-r from-green-500 to-emerald-600
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
                transition-all
                duration-300
                hover:from-green-600 hover:to-emerald-700
                active:translate-y-0
                disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center gap-3
                group
              "
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="text-xl group-hover:rotate-12 transition-transform">💾</span>
                  <span>Save All Services</span>
                </>
              )}
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{services.length}</div>
                  <div className="text-sm text-gray-600">Total Services</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {services.filter(s => validateServices([s])).length}
                  </div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {services.filter(s => !validateServices([s])).length}
                  </div>
                  <div className="text-sm text-gray-600">Incomplete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminServices;