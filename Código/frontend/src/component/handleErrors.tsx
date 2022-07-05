import { ErrorMessage } from '@hookform/error-message';

export const handleErrors = ({ name, errors }) => {
  return errors ? (
    <>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages ?
            Object.entries(messages).map(([type, message]) => (
              <div id={type} className="feedback color-danger mt-1">
                <i className="fa-solid fa-times-circle" />
                <span>{message}</span>
              </div>
            )) : (<></>)
        }
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div id={'messages'} className="feedback color-danger mt-1">
            <i className="fa-solid text-red-500 fa-times-circle" />
            <span className="text-red-500">{message}</span>
          </div>
        )}
      />
    </>
  ) : (<></>)
}