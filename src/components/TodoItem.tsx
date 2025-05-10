"use client";
import React from "react";
import Todotype from "./Todo.type";


interface Props {
  id: number;
  isCompleted: boolean;
  title: string;
  description: string;
  onEdit?: (editingTodo: Todotype) => void;
  onDelete?: () => void;
  onChange?: (id: number, newValue: boolean) => void;
}

export default function Todo({
  id,
  description,
  isCompleted,
  title,
  onChange,
  onEdit,
  onDelete,
}: Props) {
  function handleCheck() {
    if (!onChange) return;
    onChange(id, !isCompleted);
  }

  function handleEditClick() {
    onEdit && onEdit({ id, title, description });
  }

  return (
    <div className="flex items-center justify-between bg-white border border-blue-200 rounded-md shadow-sm hover:shadow-md p-4 transition-all group">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={handleCheck}
          readOnly
          className="mt-1 accent-blue-600"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <div className="gap-2 hidden group-hover:flex">
        <button
          className="p-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
          onClick={handleEditClick}
        >
          ✏️
        </button>
        <button
          className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
