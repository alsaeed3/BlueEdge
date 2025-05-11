import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { WaveAvatar } from "./WaveAvatar";
import Panorama360 from "./Panorama360";
import Voucher from "./Voucher";
import InvestmentChart from "./InvestmentChart";
import EmailSent from "./EmailSent";
import PointsReward from "./PointsReward";

interface ToolCall {
  name: string;
  arguments: any;
}

interface SceneProps {
  toolCall: ToolCall;
  isAISpeaking: boolean;
}
export default function AiSection({ toolCall, isAISpeaking }: SceneProps) {
  const [displayComponent, setDisplayComponent] = useState('')
  const [pointsData, setPointsData] = useState({
    initialPoints: 4900,
    earnedPoints: 100,
    message: "Points Added!"
  })
  const [investmentData, setInvestmentData] = useState({
    propertyName: "Dubai Downtown Property",
    initialInvestment: 500000,
    annualReturn: 7.5,
    years: 10,
    additionalInfo: {
      locationGrowth: 9.2,
      rentalYield: 5.8,
      propertyType: "Apartment"
    }
  })

  useEffect(() => {
    if (!toolCall) return;

    // Parse arguments
    const { name, arguments: toolArgs } = toolCall;
    let args: any = {};
    try {
      args = JSON.parse(toolArgs);
      console.log("Parsed toolCall arguments:", args);
    } catch (error) {
      console.error("Failed to parse toolCall arguments:", error);
      return;
    }

    switch (name) {
      case "show_map":
        setDisplayComponent('map');
        break;
      case "do_virtual_tour":
        setDisplayComponent('tour');
        break;
      case "send_contract":
        setDisplayComponent('contract');
        break;
      case "give_voucher":
        setDisplayComponent('voucher');
        break;
      case "show_property_investment":
        if (args.propertyName) {
          setInvestmentData({
            propertyName: args.propertyName || "Dubai Downtown Property",
            initialInvestment: args.initialInvestment || 500000,
            annualReturn: args.annualReturn || 7.5,
            years: args.years || 10,
            additionalInfo: {
              locationGrowth: args.locationGrowth || 9.2,
              rentalYield: args.rentalYield || 5.8,
              propertyType: args.propertyType || "Apartment"
            }
          });
        }
        setDisplayComponent('investment');
        break;
      case "show_investment_options":
        setDisplayComponent('invest');
        break;
      case 'show_contract':
        setDisplayComponent('contract');
        break;
      case 'add_points':
        if (args) {
          setPointsData({
            initialPoints: args.currentPoints || 1250,
            earnedPoints: args.pointsToAdd || 100,
            message: args.message || "Points Added!"
          });
        }
        setDisplayComponent('points');
        break;
      default:
        setDisplayComponent('');
        break;
    }
  }, [toolCall]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex justify-center mt-4">
        <WaveAvatar isAIActive={isAISpeaking}/>
      </div>
      <AnimatePresence mode="wait">
        {displayComponent === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl h-96 bg-gray-100 rounded-lg shadow-md overflow-hidden animate-fadeIn"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115423.25256146063!2d55.17891808472764!3d25.17029676221948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1689877546875!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai Map"
            />
          </motion.div>
        )}
        {displayComponent === 'tour' && (
          <motion.div
            key="tour"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-[480px] h-[480px] mx-auto animate-fadeIn"
          >
            <Panorama360/>
          </motion.div>
        )}
        {displayComponent === 'voucher' && (
          <motion.div
            key="voucher"
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Voucher
              title="Mercedes-AMG C 43 4MATIC"
              description=""
            />
          </motion.div>
        )}
        {displayComponent === 'contract' && (
          <motion.div
            key="contract"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <EmailSent 
              recipientEmail="client@example.com"
              documentName="Contract" 
              onResend={() => {
                // You could add resend functionality here if needed
                console.log("Resending email...");
              }}
            />
          </motion.div>
        )}
        {displayComponent === 'invest' && (
          <motion.div
            key="investment"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl bg-transparent px-4"
          >
            <InvestmentChart 
              propertyName={investmentData.propertyName}
              initialInvestment={investmentData.initialInvestment}
              annualReturn={investmentData.annualReturn}
              years={investmentData.years}
              additionalInfo={investmentData.additionalInfo}
            />
          </motion.div>
        )}
        {displayComponent === 'points' && (
          <motion.div
            key="points"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-transparent px-4"
          >
            <PointsReward
              initialPoints={pointsData.initialPoints}
              earnedPoints={pointsData.earnedPoints}
              message={pointsData.message}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}