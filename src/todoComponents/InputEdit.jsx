import React from 'react'

export const InputEdit = ({isEdit,item,setText,text}) => {
  return (
    <div>
          <div className="flex-item" >
        {isEdit ? (
          <input
            className="choosen-item"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        ) : (
          <p className="item">{item.title}</p>
        )}
      </div>
    </div>
  )
}
