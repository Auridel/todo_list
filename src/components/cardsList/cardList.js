import React from "react";
import {connect} from "react-redux";
import Card from "../card/card";
import {DELETE_CARD} from "../../actions";

const CardList = ({entries, columnId, DELETE_CARD, service}) => {

    const deleteCard = (colId, cardId) =>{
        DELETE_CARD(colId, cardId);
        const idx = entries.findIndex(item => +item.id === +colId),
            newCards = entries[idx].cards.filter(item => {
            return +item.id !== +cardId
        }),
            newColumn = Object.assign({}, entries[idx]);
        newColumn.cards = [...newCards];

        service.updateColumn(colId, newColumn)
            .then(() => {
                console.log("card deleted");
            })
            .catch(() => {
                console.log("card delete error");
            })
    };

    const writeMarkup = (items, colId) => {
        const idx = entries.findIndex(item => +item.id === +colId);
        return (
            items[idx].cards.map(elem => {
                return <Card
                    onDelete={deleteCard}
                    key={elem.id}
                    text={elem.body}
                    cardId={elem.id}
                    columnId={colId}
                />
            })
        )
    };

    return(
        <div className="card-list">
            {
                writeMarkup(entries, columnId)
            }
        </div>
        )
};

const mapStateToProps = (state) => {
    return {
        entries: state.entries
    }
};

const mapDispatchToProps = {
    DELETE_CARD
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);