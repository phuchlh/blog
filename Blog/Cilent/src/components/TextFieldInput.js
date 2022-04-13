import React from 'react';
import { ErrorMessage, useField } from 'formik';


export const TextFieldInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
 
    return (
        <div className="       " >
            <div className='text-xs bg-transparent font-bold mb-4 text-red-600'>
                <ErrorMessage name={field.name} />
            </div>
            <div className='mt-2 ' id="form-field"  >
                <input {...field} {...props}
                    id={meta.touched === false
                        ?  'form-input'
                        : (meta.error === undefined ? 'form-input' : 'form-input-invalid')
                        }

                    placeholder=" " />
                <label
                className={`ml-${props.left} `}
                    htmlFor={field.name}
                    id={meta.touched === false
                        ? 'form-label'
                        : (meta.error === undefined ? 'form-label' : 'form-label-invalid')
                        }
                >{label}</label>
            </div>
        </div>
    )
}