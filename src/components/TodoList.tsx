"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";
import Todo from "./Todo.type";
import { checkTodo, createTodo, deleteTodo, editTodo } from "../services/supabase/Todo.service";
import useTodos from "./useTodos.hook";

export default function TodoList() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const { todos, loading, updateTodos } = useTodos();

  function handleClick() {
    setModalOpen(true);
  }

  async function handleChange(id: number, newValue: boolean) {
    await checkTodo(id, newValue);
  }

  function handleEditingChange(editingValues: Todo) {
    setEditingTodo(editingValues);
    setModalOpen(true);
  }

  async function handleEdit(updatedTodo: Todo) {
    await editTodo(updatedTodo.id, updatedTodo);
    setModalOpen(false);
    await updateTodos();
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    await updateTodos();
  }

  async function handleCreate(title: string, description: string) {
    await createTodo(title, description);
    setModalOpen(false);
    await updateTodos();
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-sky-50 to-blue-100 min-h-screen">
      <header className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-blue-800">📘 Seguimiento de Actividades - 1</h1>
        <p className="text-gray-700 mt-3 text-lg">
           Aquí se registran  las actividades semanales realizadas. Puedes agregar, editar y marcar tareas completadas.
        </p>
      </header>

      <div className="flex flex-col gap-4 w-full max-w-xl mt-6">
        {todos.map((todo) => (
          <TodoItem
            id={todo.id}
            isCompleted={todo.isCompleted ?? false}
            title={todo.title}
            description={todo.description}
            key={todo.id}
            onChange={handleChange}
            onDelete={() => handleDelete(todo.id)}
            onEdit={handleEditingChange}
          />
        ))}
        {loading && <span className="text-gray-500">Cargando tareas...</span>}
        <button
          className="self-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 active:scale-95 transition-all shadow-md"
          onClick={handleClick}
        >
          ➕ Nueva Tarea
        </button>
      </div>

      {modalIsOpen && (
        <TodoModal
          editingTodo={editingTodo}
          onClose={() => {
            setModalOpen(false);
            setEditingTodo(null);
          }}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
