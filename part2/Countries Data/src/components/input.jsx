const Input = ({handleSearch}) => {
    return (
        <>
            <label>Search Country By Name:
                <input type="search" placeholder="Kenya..." onChange={handleSearch}></input>
            </label>
        </>
    )
}
export default Input