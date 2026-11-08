import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Zap, Unlock, Lock } from 'lucide-react';

export default function LessonTopNavigation({
  sidebarOpen,
  setSidebarOpen,
  course,
  progressData,
  activeUnit,
  toolsStripOpen,
  setToolsStripOpen,
  gatewayUnlockAll,
  toggleGatewayUnlock,
  onOpenTerminal = () => {}
}) {
  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-[#FF7A00]/25 px-4 sm:px-6 lg:px-8 py-3">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 truncate min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl border border-[#FF7A00]/30 bg-black/60 text-[#FFA439] hover:bg-[#FF7A00]/20 transition-all cursor-pointer flex-shrink-0"
            title={sidebarOpen ? 'Hide Course Outline' : 'Show Course Outline'}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="truncate text-xs font-mono min-w-0">
            <span className="text-[#A3907C] hidden md:inline font-lora">Course / </span>
            <span className="text-white font-bold truncate font-lora">{course?.title}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
          <div className="hidden sm:flex items-center space-x-4 text-xs font-mono">
            <Link
              to={`/student/course/${course?.id}?tab=course`}
              className="text-[#FFA439] hover:underline font-bold"
            >
              Course
            </Link>
            <Link
              to={`/student/course/${course?.id}?tab=progress`}
              className="text-[#E2D9CE] hover:text-[#FFA439] transition-colors"
            >
              Progress
            </Link>
            <Link
              to={`/student/course/${course?.id}?tab=grades`}
              className="text-[#E2D9CE] hover:text-[#FFA439] transition-colors"
            >
              Grades
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-[#A3907C]">
            <span>{progressData.completed}/{progressData.total} units</span>
            <div className="w-20 bg-[#161009] h-2 rounded-full overflow-hidden border border-[#FF7A00]/25">
              <div
                className="bg-[#FF7A00] h-full transition-all duration-300"
                style={{ width: `${progressData.percentage}%` }}
              />
            </div>
            <span className="text-white font-bold">{progressData.percentage}%</span>
          </div>

          {/* Temporary Review Gateway Toggle */}
          {toggleGatewayUnlock && (
            <button
              type="button"
              onClick={toggleGatewayUnlock}
              className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                gatewayUnlockAll
                  ? 'bg-[#FF7A00]/20 text-[#FFA439] border-[#FF7A00]/50 shadow-[0_0_12px_rgba(255,122,0,0.25)]'
                  : 'bg-black/60 text-[#A3907C] border-white/10 hover:text-white'
              }`}
              title={
                gatewayUnlockAll
                  ? 'Testing Gateway ACTIVE: All modules unlocked for review. Click to switch to strict linear mode.'
                  : 'Testing Gateway: Strict progression active. Click to unlock all modules for testing.'
              }
            >
              {gatewayUnlockAll ? (
                <Unlock className="w-3.5 h-3.5 text-[#FF7A00]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#A3907C]" />
              )}
              <span className="text-[11px] font-bold hidden xl:inline">
                {gatewayUnlockAll ? 'Gateway: All Unlocked' : 'Strict Mode'}
              </span>
            </button>
          )}

          {activeUnit?.type === 'lesson' && (
            <button
              type="button"
              onClick={() => setToolsStripOpen(!toolsStripOpen)}
              className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center space-x-1.5 ${
                toolsStripOpen
                  ? 'bg-[#FF7A00]/25 text-[#FFA439] border-[#FF7A00]/50 shadow-[0_0_12px_rgba(255,122,0,0.3)]'
                  : 'bg-black/60 text-[#E2D9CE] border-[#FF7A00]/25 hover:text-white'
              }`}
              title={toolsStripOpen ? 'Collapse Tools Strip' : 'Show Tools Strip'}
            >
              <Zap className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-[11px] font-bold hidden sm:inline">Tools</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
