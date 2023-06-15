// 텍스트 요청
export interface ReqText {
    instances: { content: string; }[],
    parameters: {
        temperature: number, // 자유도
        maxOutputTokens: number, // 최대 토큰(많을 수록 많은 글자 입력 가능
        topP: number,
        topK: number
    }
}

// 텍스트 응답
export interface ResText {
    predictions: {
        content: string,
        citationMetadata: {
            citations: any[]
        },
        safetyAttributes: {
            blocked: boolean,
            scores: number[],
            categories: string[]
        }
    }[];
}

export type Author = 'user' | 'bot';

export interface PreExample {
    author: Author;
    content: string;
}

export interface ChatMessage {
    author: Author;
    content: string;
    citationMetadata?: {
        citations: string[];
    }
}

// 채팅 요청
export interface ReqChat {
    instances: {
        context?: string,
        examples?: {
            input: PreExample;
            output: PreExample;
        }[],
        messages: ChatMessage[]
    }[],
    parameters: {
        temperature: number;
        maxOutputTokens: number;
        topP: number;
        topK: number;
    }
}

// 채팅 응답
export interface ResChat {
    predictions: {
        safetyAttributes: {
            blocked: boolean,
            categories: string[],
            scores: number[],
        },
        candidates: {
            content: string,
            author: string,
        }[],
        citationMetadata: {
            citations: any[],
        }[],
    }[];
}
