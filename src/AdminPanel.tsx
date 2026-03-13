import React, { useState } from 'react';
import { Plus, Trash2, Save, X, Video, FileText, Users, Clock, Award } from 'lucide-react';
import { Recipe, Step } from './data';

interface AdminPanelProps {
  onSave: (recipe: Recipe) => void;
  onClose: () => void;
  existingRecipes: Recipe[];
}

export default function AdminPanel({ onSave, onClose, existingRecipes }: AdminPanelProps) {
  const [title, setTitle] = useState('');
  const [driveId, setDriveId] = useState('');
  const [chef, setChef] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState<'Dễ' | 'Trung bình' | 'Khó'>('Dễ');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<Step[]>([{ id: 1, title: '', description: '' }]);

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => setSteps([...steps, { id: steps.length + 1, title: '', description: '' }]);
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));
  const updateStep = (index: number, field: keyof Step, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title,
      driveId,
      chef,
      duration,
      difficulty,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      steps: steps.filter(s => s.title.trim() !== ''),
    };
    onSave(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-[#0A0A0A] rounded-[3rem] shadow-[0_0_100px_rgba(227,24,55,0.2)] overflow-hidden flex flex-col max-h-[90vh] border border-[#E31837]/30">
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#E31837]/20 flex justify-between items-center bg-black/40">
          <div>
            <h2 className="text-3xl font-black text-[#E31837] uppercase italic tracking-tighter">Quản trị Công thức</h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Thêm mới hoặc chỉnh sửa nội dung</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-[#E31837]/20 rounded-full text-[#E31837] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                <FileText className="w-4 h-4" /> Tên món ăn
              </label>
              <input 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Bò Lúc Lắc"
                className="w-full px-6 py-4 bg-white/5 border-2 border-[#E31837]/20 rounded-2xl focus:border-[#E31837] outline-none transition-all font-bold text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                <Video className="w-4 h-4" /> Google Drive ID
              </label>
              <input 
                required
                value={driveId}
                onChange={(e) => setDriveId(e.target.value)}
                placeholder="Mã ID từ link Drive"
                className="w-full px-6 py-4 bg-white/5 border-2 border-[#E31837]/20 rounded-2xl focus:border-[#E31837] outline-none transition-all font-bold text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                <Users className="w-4 h-4" /> Đầu bếp
              </label>
              <input 
                value={chef}
                onChange={(e) => setChef(e.target.value)}
                placeholder="Tên Chef"
                className="w-full px-6 py-4 bg-white/5 border-2 border-[#E31837]/20 rounded-2xl focus:border-[#E31837] outline-none transition-all font-bold text-white placeholder:text-white/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                  <Clock className="w-4 h-4" /> Thời gian
                </label>
                <input 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="15 phút"
                  className="w-full px-6 py-4 bg-white/5 border-2 border-[#E31837]/20 rounded-2xl focus:border-[#E31837] outline-none transition-all font-bold text-white placeholder:text-white/20"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40">
                  <Award className="w-4 h-4" /> Độ khó
                </label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-[#E31837]/20 rounded-2xl focus:border-[#E31837] outline-none transition-all font-bold text-white"
                >
                  <option value="Dễ" className="bg-[#0A0A0A]">Dễ</option>
                  <option value="Trung bình" className="bg-[#0A0A0A]">Trung bình</option>
                  <option value="Khó" className="bg-[#0A0A0A]">Khó</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-black uppercase italic text-white">Nguyên liệu</h4>
              <button 
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-[#E31837] font-black text-xs uppercase tracking-widest hover:opacity-70"
              >
                <Plus className="w-4 h-4" /> Thêm nguyên liệu
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex gap-2">
                  <input 
                    value={ing}
                    onChange={(e) => updateIngredient(idx, e.target.value)}
                    placeholder={`Nguyên liệu ${idx + 1}`}
                    className="flex-1 px-6 py-3 bg-white/5 border border-[#E31837]/20 rounded-xl focus:border-[#E31837] outline-none font-medium text-white placeholder:text-white/20"
                  />
                  {ingredients.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="p-3 text-[#E31837]/40 hover:text-[#E31837]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-black uppercase italic text-white">Các bước thực hiện</h4>
              <button 
                type="button"
                onClick={addStep}
                className="flex items-center gap-2 text-[#E31837] font-black text-xs uppercase tracking-widest hover:opacity-70"
              >
                <Plus className="w-4 h-4" /> Thêm bước
              </button>
            </div>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-white/5 border border-[#E31837]/20 rounded-3xl p-6 space-y-4 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-[#E31837]/30">#{idx + 1}</span>
                    {steps.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeStep(idx)}
                        className="p-2 text-[#E31837]/40 hover:text-[#E31837]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input 
                    value={step.title}
                    onChange={(e) => updateStep(idx, 'title', e.target.value)}
                    placeholder="Tiêu đề bước (VD: Sơ chế thịt)"
                    className="w-full px-6 py-3 bg-black/40 border border-[#E31837]/20 rounded-xl focus:border-[#E31837] outline-none font-bold text-white placeholder:text-white/20"
                  />
                  <textarea 
                    value={step.description}
                    onChange={(e) => updateStep(idx, 'description', e.target.value)}
                    placeholder="Mô tả chi tiết cách làm..."
                    rows={3}
                    className="w-full px-6 py-3 bg-black/40 border border-[#E31837]/20 rounded-xl focus:border-[#E31837] outline-none text-sm leading-relaxed text-white placeholder:text-white/20"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-[#E31837]/20 bg-black/40 flex justify-end gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-8 py-4 font-black uppercase tracking-widest text-xs text-white/40 hover:text-white"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSubmit}
            className="px-10 py-4 bg-[#E31837] text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-[#E31837]/40 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Lưu công thức
          </button>
        </div>
      </div>
    </div>
  );
}
