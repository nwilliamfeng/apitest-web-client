

export const Input=({onSubmit,inputStyle={},placeholder=''})=>{
    let input=null;
    const keyHandle=e=>{
        e.preventDefault();
        onSubmit(input.value);
    }
    return <input ref={el=>input=el} onKeyPress={keyHandle} style={inputStyle} placeholder={placeholder}/>
}