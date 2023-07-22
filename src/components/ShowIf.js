const ShowIf = ({ condition, render, renderElse }) => {
    if (condition) {
        return <>{render()}</>;
    }
    if (renderElse) {
        return <>{renderElse()}</>;
    }
    return null;
};

export default ShowIf;