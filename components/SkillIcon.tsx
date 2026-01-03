/**
 * Skill icon component with dynamic icon mapping
 */
import {
  Code2,
  Lightbulb,
  Users,
  Zap,
  Layers,
  Target,
  Cpu,
  FileText,
  GitBranch,
  BarChart3,
  Settings,
  Lock,
  MessageCircle,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

interface SkillIconProps {
  skill: string;
  size?: number;
}

// Map skill names to icons
const skillIconMap: Record<string, LucideIcon> = {
  // Presales & Solutioning
  "RFP/RFI Response": FileText,
  "Technical Demos": Zap,
  "Discovery Workshops": Users,
  "Solution Design": Lightbulb,

  // Cloud & Architecture
  AWS: Cpu,
  Docker: Layers,
  Kubernetes: Settings,
  "System Integration": GitBranch,

  // Technical Product
  "Product Documentation": FileText,
  "Technical Architecture": Layers,
  "API Design": Code2,
  "Requirements Analysis": Target,

  // Enterprise & Fintech
  "Enterprise Software": Briefcase,
  "Cross-border Payments": BarChart3,
  Compliance: Lock,
  "MEDDICC Methodology": Target,

  // Communication & Soft Skills
  "Client-facing Communication": MessageCircle,
  "Business Discovery": Lightbulb,
  "Cross-cultural Collaboration": Users,
  "Stakeholder Management": Users,

  // Default fallback
  "default": Code2,
};

export function SkillIcon({ skill, size = 24 }: SkillIconProps) {
  const Icon = skillIconMap[skill] || skillIconMap["default"];
  return <Icon size={size} className="text-slate-700" />;
}
