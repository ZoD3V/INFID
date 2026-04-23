export interface MultilanguageText {
    language: 'id' | 'en';
    text: string;
}

export interface QuizOption {
    id: number;
    option: MultilanguageText[];
    is_correct: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface QuizQuestion {
    id: number;
    question: MultilanguageText[];
    weight: number;
    options: QuizOption[];
    created_at?: string;
    updated_at?: string;
}

export interface QuizFeedback {
    id: number;
    min_score: number;
    narrative: MultilanguageText[];
    created_at?: string;
    updated_at?: string;
}

export interface QuizData {
    id: number;
    title: MultilanguageText[];
    is_active: boolean;
    questions: QuizQuestion[];
    feedbacks: QuizFeedback[];
    created_at?: string;
    updated_at?: string;
}

export type UserAnswers = Record<number, number>;

export type AnsweredStatus = Record<number, boolean>;
