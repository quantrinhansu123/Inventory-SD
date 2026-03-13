import React, { useState, useEffect } from 'react';
import { Play, Clock, ChefHat, ListChecks, Utensils, Info, Menu, X, ArrowRight, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { recipes as initialRecipes, Recipe } from './data';
import AdminPanel from './AdminPanel';

const LOGO_URL = "https://www.appsheet.com/template/gettablefileurl?appName=Appsheet-325045268&tableName=Kho%20%E1%BA%A3nh&fileName=Kho%20%E1%BA%A3nh_Images%2Fa149df68.%E1%BA%A2nh.173719.jpg";

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(initialRecipes[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Update selected recipe if it's the first time or if the list changes
  useEffect(() => {
    if (!selectedRecipe && recipes.length > 0) {
      setSelectedRecipe(recipes[0]);
    }
  }, [recipes, selectedRecipe]);

  const handleSaveRecipe = (newRecipe: Recipe) => {
    setRecipes([newRecipe, ...recipes]);
    setSelectedRecipe(newRecipe);
    setIsPlaying(false);
  };

  const driveEmbedUrl = `https://drive.google.com/file/d/${selectedRecipe?.driveId}/preview`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#E31837] selection:text-white relative overflow-x-hidden">
      
      {/* Bold Background Logo */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.15]"
        style={{
          backgroundImage: `url(${LOGO_URL})`,
          backgroundSize: '80%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6) contrast(1.5) saturate(1.2)'
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-[#E31837]/30 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={LOGO_URL} 
            alt="Logo" 
            className="h-12 w-auto object-contain brightness-110"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-[#E31837]">Inventory SD</h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-12">
          {['Khám phá', 'Công thức', 'Cộng đồng', 'Về chúng tôi'].map((item) => (
            <a key={item} href="#" className="text-sm font-black uppercase tracking-widest hover:text-[#E31837] transition-colors text-white/80">
              {item}
            </a>
          ))}
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E31837]/10 hover:bg-[#E31837] text-[#E31837] hover:text-white rounded-full transition-all text-xs font-black uppercase tracking-widest border border-[#E31837]/30"
          >
            <Settings className="w-4 h-4" /> Admin
          </button>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 hover:bg-[#E31837]/20 rounded-full transition-colors text-[#E31837]"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <main className="relative z-10 w-full px-4 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Recipe Details (Full height sticky) */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-xl border-2 border-[#E31837]/30 rounded-[3rem] p-10 shadow-[0_0_50px_rgba(227,24,55,0.1)] sticky top-28"
            >
              {selectedRecipe ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="px-4 py-1.5 bg-[#E31837] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {selectedRecipe.difficulty}
                    </span>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-tight">
                      {selectedRecipe.title}
                    </h3>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#E31837]">
                      <Utensils className="w-5 h-5" />
                      <h4 className="text-sm font-black uppercase italic">Nguyên liệu</h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedRecipe.ingredients.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 text-sm font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E31837] mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6 pt-6 border-t border-[#E31837]/20">
                    <div className="flex items-center gap-2 text-[#E31837]">
                      <ListChecks className="w-5 h-5" />
                      <h4 className="text-sm font-black uppercase italic">Các bước thực hiện</h4>
                    </div>
                    <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                      {selectedRecipe.steps.map((step, index) => (
                        <div key={step.id} className="flex gap-4 group">
                          <span className="text-2xl font-black text-[#E31837]/30 group-hover:text-[#E31837] transition-colors select-none shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-bold text-white text-sm">{step.title}</h5>
                            <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-white/10 font-black uppercase tracking-widest italic">
                  Chọn một công thức để bắt đầu
                </div>
              )}
            </motion.div>
          </aside>

          {/* Right Column: Video & Playlist */}
          <div className="lg:col-span-9 space-y-8 order-1 lg:order-2">
            {/* Large Video Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(227,24,55,0.15)] border-2 border-[#E31837]/30 bg-black group"
            >
              {selectedRecipe ? (
                !isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                    <div className="text-center z-20 space-y-6">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(true)}
                        className="w-24 h-24 rounded-full bg-[#E31837] flex items-center justify-center shadow-[0_0_50px_rgba(227,24,55,0.6)] mx-auto"
                      >
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </motion.button>
                      <div className="space-y-1">
                        <p className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px]">Đang xem</p>
                        <h2 className="text-2xl lg:text-4xl font-black text-white uppercase italic tracking-tighter">
                          {selectedRecipe.title}
                        </h2>
                      </div>
                    </div>
                    <img 
                      src={`https://picsum.photos/seed/${selectedRecipe.id}/1920/1080`} 
                      alt={selectedRecipe.title}
                      className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40 grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <iframe
                    src={`${driveEmbedUrl}&autoplay=1`}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    title={selectedRecipe.title}
                  ></iframe>
                )
              ) : null}
            </motion.div>

            {/* Playlist Horizontal */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-2">
                Danh sách món ăn
              </h4>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {recipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setIsPlaying(false);
                    }}
                    className={`group shrink-0 w-64 flex flex-col gap-3 p-4 rounded-[2rem] transition-all border ${
                      selectedRecipe?.id === recipe.id 
                        ? 'bg-[#E31837] border-[#E31837] text-white shadow-lg shadow-[#E31837]/30' 
                        : 'bg-white/5 backdrop-blur-sm hover:bg-[#E31837]/10 border-[#E31837]/20 text-white'
                    }`}
                  >
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${recipe.id}/400/225`} 
                        alt={recipe.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center ${
                        selectedRecipe?.id === recipe.id ? 'bg-[#E31837]/40' : 'bg-black/40 group-hover:bg-black/20'
                      }`}>
                        <Play className="w-6 h-6" fill="currentColor" />
                      </div>
                    </div>
                    <div className="text-left px-1">
                      <p className="font-bold text-sm leading-tight line-clamp-1">
                        {recipe.title}
                      </p>
                      <p className={`text-[10px] uppercase font-black tracking-widest mt-1 ${
                        selectedRecipe?.id === recipe.id ? 'text-white/60' : 'text-white/30'
                      }`}>
                        {recipe.duration} • {recipe.difficulty}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel 
            onSave={handleSaveRecipe}
            onClose={() => setIsAdminOpen(false)}
            existingRecipes={recipes}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[#0A0A0A] z-[70] p-10 shadow-2xl lg:hidden border-l border-[#E31837]/20"
            >
              <div className="flex justify-between items-center mb-12">
                <img src={LOGO_URL} alt="Logo" className="h-10 w-auto brightness-110" />
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-[#E31837]/10 rounded-full text-[#E31837]"><X /></button>
              </div>
              <div className="space-y-8">
                {['Khám phá', 'Công thức', 'Cộng đồng', 'Về chúng tôi'].map((item) => (
                  <a key={item} href="#" className="block text-2xl font-black tracking-tighter uppercase italic text-white hover:text-[#E31837] transition-colors">
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsAdminOpen(true);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E31837] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[#E31837]/20"
                >
                  <Settings className="w-4 h-4" /> Admin Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="relative z-10 mt-32 border-t border-[#E31837]/20 py-20 px-6 text-center bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src={LOGO_URL} alt="Footer Logo" className="h-8 w-auto opacity-30 brightness-110" />
          <span className="text-sm font-black tracking-[0.4em] uppercase italic text-[#E31837]/60">Inventory SD</span>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">© 2026 Inventory SD. Crafted for Excellence.</p>
      </footer>
    </div>
  );
}
