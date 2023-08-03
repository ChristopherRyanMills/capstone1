export const PaintSearch = ({ setterFunction }) => {
    return (
        <div>
            <input
                onChange={
                    (evt) => {
                        setterFunction(evt.target.value)
                    }
                }
            type="text" placeholder="Search..."/>
        </div>
    )
}