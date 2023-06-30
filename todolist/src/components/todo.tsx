import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BsCheck } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import {TodoFormProps} from '../types/types'


export const Todo = () => {
  const [editIndex, setEditIndex] = useState<number>(-1);
  const { register, handleSubmit, reset } = useForm<TodoFormProps>();
  const [todos, setTodos] = useState<TodoFormProps[]>([]);
  const [edited, setEdited] = useState('');

  /**
   * 
   * @param data 
   * @returns
   * data is pushed to todos array
   */

  const onSubmit = (data: TodoFormProps) => {
    const todo = {
      id: todos.length + 1,
      todo: {
        data: data.todo.data,
        completed: false,
      },
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    console.log(todos);
    reset();
  };
  /**
   * 
   * @param index 
   * @returns
   * index of todo is set to editIndex
   */

  const deleteTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  /**
   * 
   * @param index 
   * @returns 
   * index of todo is set to editIndex
   */

  const handleEdit =
    (index: number): React.FormEventHandler<HTMLFormElement> =>
    (data: any) => {
      data = register('todo', { required: true });
      console.log(data, index);
      // setEditIndex(-1);
    };

    /**
     * 
     * @param index 
     * @returns
     * array of todos is copied to updatedTodos
     */
  const editedUpdate = (index: number) => {
    console.log('edited', edited);
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      console.log('updatedTodos', updatedTodos[index]);
      updatedTodos[index].todo.data = edited;
      return updatedTodos;
    });
    setEditIndex(-1);
  };

  /**
   * 
   * @param e 
   * @returns
   * value of input is set to edited
   */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEdited(value);
    console.log(edited);
  };

  /**
   * 
   * @param index 
   * @returns
   */

  const completed = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = {
        ...updatedTodos[index],
        todo: {
          ...updatedTodos[index].todo,
          completed: true,
        },
      };
      return updatedTodos;
    });
  };

  return (
    <>
      <div className='h-[600px] w-[600px] rounded-xl bg-gray-800 p-4 flex flex-col justify-between'>
        <div className='w-full h-[50px] rounded-full flex flex-row justify-between'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full h-[50px] flex flex-row'>
            <input
              placeholder='create a task...'
              type='text'
              className='h-[50px] w-[80%] rounded-full'
              {...register('todo.data', { required: true })}
            />
            <button
              data-tooltip-id='my-tooltip'
              data-tooltip-content='create'
              type='submit'
              className='bg-orange-500 h-[50px] w-[20%] rounded-full flex flex-row items-center justify-center'
            >
              <Tooltip id='my-tooltip' />
              <IoMdAdd size={20} color='white' />
              <p className='text-white'>add</p>
            </button>
          </form>
        </div>
        <div className='bg-gray-700 w-full h-[500px] rounded-xl p-2 flex flex-col gap-3'>
          {todos.map((todo: TodoFormProps, index) => {
            if (!todo.todo.completed) {
              return (
                <div className='bg-slate-100 w-full h-[50px] rounded-xl items-center pl-3 flex justify-between' key={index}>
                  {editIndex === index ? (
                    <form className='w-full flex flex-row' onSubmit={handleEdit(index)}>
                      <input className='h-[40px] w-[90%] rounded-xl' type='text' onChange={handleChange} />
                      <div className='flex flex-row gap-1 '>
                        <button
                          data-tooltip-id='my-tooltip'
                          type='submit'
                          onClick={() => editedUpdate(index)}
                          data-tooltip-content='save'
                          className='h-[50px] flex items-center justify-center bg-blue-500 w-[50px] rounded-xl'
                        >
                          save
                          <Tooltip id='my-tooltip' />
                        </button>
                        <button
                          data-tooltip-id='my-tooltip'
                          onClick={() => setEditIndex(-1)}
                          data-tooltip-content='cancel'
                          className='h-[50px] flex items-center justify-center bg-red-500 w-[50px] rounded-xl'
                        >
                          cancel
                          <Tooltip id='my-tooltip' />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className='text-gray-900'>{todo.todo.data}</p>
                  )}

                  {editIndex === index ? (
                    <></>
                  ) : (
                    <div className='h-[50px] w-[40%] rounded-xl p-3 flex items-center justify-evenly'>
                      <button
                        data-tooltip-id='my-tooltip'
                        onClick={() => completed(index)}
                        data-tooltip-content='done'
                        className='h-[50px] flex items-center justify-center bg-green-500 w-[30%] rounded-xl'
                      >
                        <Tooltip id='my-tooltip' />
                        <BsCheck size={20} />
                      </button>
                      <button
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content='edit'
                        onClick={() => {
                          setEditIndex(index);
                        }}
                        className='h-[50px] flex items-center justify-center bg-blue-500 w-[30%] rounded-xl'
                      >
                        <Tooltip id='my-tooltip' />
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        data-tooltip-id='my-tooltip'
                        onClick={() => deleteTodo(index)}
                        data-tooltip-content='delete'
                        className='h-[50px] flex items-center justify-center bg-red-500 w-[30%] rounded-xl'
                      >
                        <Tooltip id='my-tooltip' />
                        <AiFillDelete size={20} />
                      </button>
                    </div>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};
