'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EmailSentProps {
  recipientEmail?: string;
  documentName?: string;
  onResend?: () => void;
}

export default function EmailSent({ 
  recipientEmail = "you@example.com", 
  documentName = "Contract Document",
  onResend
}: EmailSentProps) {
  const [isSent, setIsSent] = useState(true);
  
  useEffect(() => {
    // Animation effect when component mounts
    setIsSent(true);
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center backdrop-blur-sm p-8 rounded-xl max-w-md mx-auto text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Email Icon */}
      <motion.div
        className="text-blue-500 mb-6"
        initial={{ y: 10, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      </motion.div>

      {/* Envelope animation */}
      <motion.div
        className="w-16 h-16 bg-blue-500/10 rounded-full absolute z-[-1]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
      />

      {/* Success Message */}
      <motion.h2 
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Document Sent!
      </motion.h2>
      
      <motion.p 
        className="text-white/90 text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        The {documentName} has been emailed to:
      </motion.p>
      
      <motion.div 
        className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-lg font-medium text-white/90 mb-8 w-full"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {recipientEmail}
      </motion.div>
      
      {/* Check your inbox message */}
      <motion.p 
        className="text-white/80 text-sm mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Please check your inbox. You can also check your spam folder if you don't see it.
      </motion.p>
      
      {/* Resend button */}
      {/* {onResend && (
        <motion.button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          onClick={onResend}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Resend Email
        </motion.button>
      )} */}
    </motion.div>
  );
}