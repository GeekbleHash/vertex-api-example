import API from "./API";
import  spawn from 'cross-spawn';

// gcloud 액세스 토큰 출력
const child = spawn.sync('gcloud', ['auth', 'print-access-token'], {stdio: 'pipe'})
let token = child.stdout.toString().replace(/ /gi, '').trim();
token = token.replace(/\t/gi, '');
token = `Bearer ${token}`;
// authorization header 설정
API.setToken(token);

// 텍스트 AI 요청
API.text({
    instances: [
        {content: 'what is geekble?'}
    ],
    parameters: {
        temperature: 0.8,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.8
    }
}).then((res) => {
    const {predictions} = res.data;
    console.log(predictions[0].content);
    console.log('===================== text =====================');
})

// 채팅 AI 요청
API.chat({
    instances: [
        {
            examples: [ // 미리 대화 설정 가능
                {input: {
                    author: 'user',
                        content: `geekble's founder is Chanhoo Park`
                    },
                output: {
                    author: 'bot',
                    content: 'yes I understand'
                }}
            ],
            // 사용자 정의 내용 학습
            context: 'geekble is content  startup.\nThat found at 2017',
            // AI 상의 대화(해댱 내용을 다음 request 에 포함하여 전달 가능
            messages: [{author: 'user', content: 'what is geekble?'}]
        }
    ],
    parameters: {
        temperature: 0.2,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.8
    }
}).then((res)=>{
    console.log(res.data.predictions[0].candidates[0].content);
    console.log('===================== chat =====================');
}).catch((e)=>{
    console.error(e);
})

// console.log(child);
