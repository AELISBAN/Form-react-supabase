"use client";
import React, { ChangeEvent, useState } from "react";
import Todo from "./Todo.type";

interface Props {
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
  onEdit: (updatedTodo: Todo) => void;
  editingTodo: Todo | null;
}

interface InputValues {
  title: string;
  description: string;
}

export default function TodoModal({ onClose, onCreate, onEdit, editingTodo }: Props) {
  const [inputValues, setInputValues] = useState<InputValues>({
    title: editingTodo?.title ?? "",
    description: editingTodo?.description ?? "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  function handleEdit() {
    if (!inputValues.title.trim() || !inputValues.description.trim() || !editingTodo) return;
    const updatedTodo: Todo = {
      id: editingTodo.id,
      title: inputValues.title,
      description: inputValues.description,
    };
    onEdit(updatedTodo);
  }

  function handleCreate() {
    if (!inputValues.title.trim() || !inputValues.description.trim()) return;
    onCreate(inputValues.title, inputValues.description);
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          {editingTodo ? "✏️ Editar Tarea" : "📝 Crear Nueva Tarea"}
        </h2>
        <input
          name="title"
          placeholder="Título"
          className="w-full p-2 border border-blue-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={inputValues.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción"
          className="w-full p-2 border border-blue-300 rounded mb-4 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={inputValues.description}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={editingTodo ? handleEdit : handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            {editingTodo ? "Guardar Cambios" : "Crear Tarea"}
          </button>
        </div>
      </div>
    </div>
  );
}
