interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...props}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className={`py-1 px-2 bg-amber-50 rounded-lg text-black ${
          props.className || ""
        }`}
      />
    </>
  );
}
