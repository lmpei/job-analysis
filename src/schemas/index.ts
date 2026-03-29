// Core data structures for Job Analyzer

export interface CandidateProfile {
  basicInfo: {
    yearsOfExperience: number;
    educationLevel: string;
    industry: string;
    currentRole: string;
  };
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projectTags: string[];
  industryExperience: string[];
  jobTarget: string;
  strengths: string[];
  weaknesses: string[];
  evidenceStrength: 'high' | 'medium' | 'low';
}

export interface JobProfile {
  basicInfo: {
    title: string;
    department: string;
    level: string;
  };
  requirements: {
    yearsOfExperience: number;
    educationLevel: string;
    technical: string[];
    soft: string[];
    tools: string[];
  };
  responsibilities: {
    explicit: string[];
    implicit: string[];
  };
  businessScenario: string;
  plusFactors: string[];
  riskPoints: string[];
}

export interface MatchResult {
  overallScore: number;
  skillMatchScore: number;
  experienceMatchScore: number;
  educationMatchScore: number;
  conclusion: string;
  confidence: 'high' | 'medium' | 'low';
  keyMatches: string[];
  keyGaps: string[];
}

export interface GapAnalysis {
  skillGaps: {
    missing: string[];
    weak: string[];
    strong: string[];
  };
  specificExamples: string[];
}

export interface WorkSimulation {
  dayInLife: string;
  dailyTasks: string[];
  whatToExpect: string;
  avoidSurprise: string;
}

export interface LearningResource {
  name: string;
  type: 'course' | 'book' | 'article' | 'practice' | 'video';
  url?: string;
}

export interface ImprovementPlan {
  shortTerm: {
    actions: string[];
    expectedOutcome: string;
  };
  mediumTerm: {
    actions: string[];
    expectedOutcome: string;
  };
  learningResources: {
    skill: string;
    resources: LearningResource[];
  }[];
  prioritySkills: string[];
}

export interface DirectMatch {
  title: string;
  reason: string;
  searchUrl?: string;
}

export interface RelatedTransition {
  from: string;
  to: string;
  bridge: string;
}

export interface JobStrategy {
  directMatches: DirectMatch[];
  relatedTransitions: RelatedTransition[];
  applicationTips: string[];
  interviewFocus: string[];
}

export interface AnalysisReport {
  candidateProfile: CandidateProfile;
  jobProfile: JobProfile;
  matchResult: MatchResult;
  gapAnalysis: GapAnalysis;
  workSimulation: WorkSimulation;
  improvementPlan: ImprovementPlan;
  jobStrategy: JobStrategy;
  generatedAt: string;
  modelVersion: string;
}

export interface AnalyzeInput {
  candidateBackground: string;
  jobDescription: string;
}

export interface AgentContext {
  candidateBackground: string;
  jobDescription: string;
  candidateProfile?: CandidateProfile;
  jobProfile?: JobProfile;
}

export interface ApiResponse<T> {
  data: T;
  confidence: number;
  reasoning: string;
}
