function Events() {

    function handleClick (event) {
        console.log(event.target);
    };

    return (
        <>
            <button onClick={(evento) => alert("Erooooou")}>
                Clique
            </button>
        </>
    );
};

export default Events;