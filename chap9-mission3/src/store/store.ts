import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice'
import modalReducer from '../slices/modalSlice';

// 1.저장소 생성
function createStore() {
    const store = configureStore({
        // 2. 리듀서 설정
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    });

    return store;
}

// store를 활용할 수 있도록 내보냄.
// 여기서 실행해서 스토어를 빼주니 singleton 패턴이 적용됨.
const store = createStore();

// 외부에서 활용할 수 있게 빼줌.
export default store;

// RootState 타입을 추출
// getState 함수를 사용하면 RootState 타입을 추출할 수 있음.
export type RootState= ReturnType<typeof store.getState>;

// dispatch 타입을 추출
export type AppDispatch = typeof store.dispatch;