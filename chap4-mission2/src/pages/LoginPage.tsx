import useForm  from '../hooks/useForm.ts';
import { UserSigninInformation , validateSignin} from '../utils/validate.ts';

const LoginPage = () => {

    const { values, errors, touched , getInputProps} = 
        useForm<UserSigninInformation>({
        initialValue: {
            email: '',
            password: ''
        },
        validate: validateSignin,
    });

    const handleSubmit = () => {};
    

    const isDisabled = 
    Object.values(errors || {}).some((error) => error.length > 0) || 
    Object.values(values).some((value) => value === "");

    return (
        <div className='flex flex-col items-center justify-center h-full gap-4'>
            <div className='flex flex-col gap-3'>
                <input 
                    {...getInputProps('email')}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                    type={"email"}
                    placeholder="이메일"
                />
                {errors?.email && touched?.email && (
                    <div className='text-red-500 text-sm'>{errors.email}</div>
                )}
               
                <input
                {...getInputProps('password')}
                    name="password"
                    className={'border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm'}
                    id="password-input"
                    type={"password"}
                    placeholder="비밀번호"
                />

                {errors?.password && touched?.password && (
                        <div className="text-red-500 text-sm">{errors.password}</div>
                        )}
                <button type="button"
                onClick={handleSubmit}
                disabled={isDisabled}
                className='w-full bg-[#807bff] text-white p-[10px] rounded-sm hover:bg-[#6f6cfc] active:bg-[#5e5cf9] disabled:bg-[#d0d0d0] disabled:cursor-not-allowed'
                >
                    로그인
                </button>
            </div>
        </div>
    ); 
};

export default LoginPage;