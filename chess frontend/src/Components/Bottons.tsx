export const Bottons = ({onClick , children}:{onClick:() => void , children: React.ReactNode}) => {  
return <button onClick={onClick}>{children}</button>
}