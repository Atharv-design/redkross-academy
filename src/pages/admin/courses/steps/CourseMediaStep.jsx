import React from 'react';
import { Image as ImageIcon, UploadCloud, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CourseMediaStep({
  courseFormData,
  setCourseFormData,
  imageInputRef,
  onImageFileUpload,
  onBack,
  onProceed
}) {
  return (
    <div className="space-y-6 animate-slide-left">
      <div className="p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-[#FF7A00]" />
            <h4 className="font-bold text-sm text-white">Course Cover Image (Poster)</h4>
          </div>
          <div className="flex items-center space-x-1 p-1 rounded-lg bg-[#080705] border border-[#FF7A00]/20">
            <button
              type="button"
              onClick={() => setCourseFormData({ ...courseFormData, image_source_type: 'upload' })}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                courseFormData.image_source_type === 'upload'
                  ? 'bg-[#FF7A00] text-[#071018] font-bold'
                  : 'text-[#A3907C] hover:text-white'
              }`}
            >
              Upload Image File
            </button>
            <button
              type="button"
              onClick={() => setCourseFormData({ ...courseFormData, image_source_type: 'url' })}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                courseFormData.image_source_type === 'url'
                  ? 'bg-[#FF7A00] text-[#071018] font-bold'
                  : 'text-[#A3907C] hover:text-white'
              }`}
            >
              Image URL
            </button>
          </div>
        </div>

        {courseFormData.image_source_type === 'upload' ? (
          <div className="border-2 border-dashed border-[#FF7A00]/30 hover:border-[#FF7A00] rounded-xl p-6 text-center space-y-2 transition-colors">
            <UploadCloud className="w-8 h-8 text-[#FF7A00] mx-auto" />
            <div className="text-xs text-white font-medium">
              Upload course poster image (PNG, JPG, WebP)
            </div>
            <p className="text-[10px] text-[#A3907C] font-mono">
              Recommended aspect ratio 16:9 (1920x1080)
            </p>
            <label className="inline-block px-4 py-2 mt-2 rounded-lg bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/40 text-xs font-mono font-bold cursor-pointer transition-colors">
              Browse Image File
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={onImageFileUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-1">
            <input
              type="text"
              value={courseFormData.image_url}
              onChange={(e) => setCourseFormData({ ...courseFormData, image_url: e.target.value })}
              placeholder="e.g. /assets/course-art/art-01.jpg or https://images.unsplash.com/..."
              className="w-full bg-[#080705] rounded-xl p-3 text-xs text-white border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>
        )}

        {courseFormData.image_url && (
          <div className="p-3 bg-[#080705] rounded-xl border border-[#FF7A00]/20 space-y-2">
            <span className="text-xs font-mono text-[#FF7A00] font-bold block">Cover Image Preview</span>
            <div className="relative aspect-video max-w-sm rounded-lg overflow-hidden border border-white/10">
              <img
                src={courseFormData.image_url}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/course-art/art-01.jpg';
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-xs font-mono text-[#A3907C] hover:text-white flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>
        <button
          type="button"
          onClick={onProceed}
          className="px-5 py-2.5 bg-[#1A1208] hover:bg-[#0c2a1e] text-[#FF7A00] border border-[#FF7A00]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <span>Proceed to Step 3: Modules & Units</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
