import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Clock, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const TopNavbar = () => {
  const {
    logout,
    user
  } = useAuth();
  const {
    theme
  } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleBackNavigation = () => {
    navigate('/dashboard');
  };
  return <motion.div initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5,
    ease: "easeOut"
  }} className="p-3 flex items-center justify-between bg-tanseeq text-white shadow-md relative">
      {/* Logo section */}
      <motion.div className="flex-1 flex items-center">
        {window.location.pathname !== '/dashboard' && <motion.button className="mr-2 p-1.5 hover:bg-white/20 rounded-full" onClick={handleBackNavigation} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
            <ArrowLeft className="h-6 w-6" /> {/* Increased size */}
          </motion.button>}
        
        <motion.div className="flex items-center ml-2 cursor-pointer" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => navigate('/dashboard')}>
          <img src="/lovable-uploads/801b965c-36e1-485f-8e8e-fa408775a70f.png" alt="Tanseeq Investment" className="h-10" />
        </motion.div>
      </motion.div>
      
      {/* Center greeting with user's name */}
      <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2,
      duration: 0.4
    }} className=" text-white font-medium text-base">
        {user && `Hi ${user.name.split(' ')[0]}`}
      </motion.div>
      
      {/* Right side elements */}
      <div className="flex-1 flex items-center justify-end space-x-3">
        <motion.div className="hidden sm:flex items-center text-sm text-white px-3 py-1.5 rounded-md bg-white/20" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }}>
          <Clock className="h-4 w-4 mr-1.5 text-white" />
          {currentTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })}
          <span className="ml-1.5 text-white/80">
            {currentTime.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
          </span>
        </motion.div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button className="bg-white/20 text-white p-2 flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/30" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
              {user?.name.charAt(0)}
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border-tanseeq/30 rounded-lg w-56 mt-1 z-50">
            <div className="px-3.5 py-2.5 text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-tanseeq" />
              {user?.name}
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-tanseeq/10 gap-2 rounded-md mx-1 px-3 py-2">
              <Settings className="h-4 w-4 text-tanseeq" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-rose-500/10 text-rose-500 gap-2 rounded-md mx-1 px-3 py-2 mb-1">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>;
};
export default TopNavbar;