import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from 'react-router-dom';

import classes from './TradeForm.module.css';

function TradeForm({ method, trade }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="image">사진</label>
        <input id="image" type="file" name="image" required />
      </p>
      <p>
        <label htmlFor="title">제목</label>
        <input id="title" type="text" name="title" required />
      </p>
      <p>
        <label htmlFor="cost">가격</label>
        <input id="cost" type="int" name="cost" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default TradeForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const method = request.method;

  let url = 'http://localhost:8080/trade';

  if (method === 'PATCH') {
    const tradeId = params.tradeId;
    url += `/${tradeId}`;
  }

  const response = await fetch(url, {
    method: method,
    body: formData,
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save trade.' }, { status: 500 });
  }

  return redirect('/trade');
}
