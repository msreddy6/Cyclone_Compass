// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function DormForm() {
//   const { id } = useParams();              // id === 'new' for “Add New”
//   const isEdit = id && id !== 'new';       // only true if id is a real Mongo _id
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     img: ''
//   });
//   const [error, setError] = useState('');

//   // If editing (id !== 'new'), load that dorm’s data
//   useEffect(() => {
//     if (!isEdit) return;
//     axios.get('/api/dorms')
//       .then(res => {
//         const dorm = res.data.find(d => d._id === id);
//         if (dorm) {
//           setForm({
//             name: dorm.name,
//             description: dorm.description,
//             img: dorm.img
//           });
//         } else {
//           setError('Dorm not found');
//         }
//       })
//       .catch(err => {
//         console.error('Error loading dorm:', err);
//         setError('Error loading dorm');
//       });
//   }, [id, isEdit]);

//   const handleChange = e => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     console.log(isEdit ? 'Updating dorm:' : 'Creating dorm:', form);

//     try {
//       if (isEdit) {
//         await axios.put(`/api/dorms/${id}`, form);
//       } else {
//         await axios.post('/api/dorms', form);
//       }
//       navigate('/dorm-explorer');
//     } catch (err) {
//       console.error('Error saving dorm:', err);
//       setError(err.response?.data?.error || 'Submit failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>{isEdit ? 'Edit Dorm' : 'Add New Dorm'}</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Image URL</label>
//           <input
//             name="img"
//             value={form.img}
//             onChange={handleChange}
//             className="form-control"
//             placeholder="/images/dorm.jpg"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           {isEdit ? 'Save Changes' : 'Create Dorm'}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DormForm() {
  const { id } = useParams();              // id === 'new' for “Add New”
  const isEdit = id && id !== 'new';       // true if editing an existing dorm
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    img: ''
  });
  const [error, setError] = useState('');

  // Load dorm when editing
  useEffect(() => {
    if (!isEdit) return;

    setError(''); // clear previous errors

    axios
      .get(`/api/dorms/${id}`)
      .then(res => {
        const { name, description, img } = res.data;
        setForm({ name, description, img });
      })
      .catch(err => {
        console.error('Error loading dorm:', err);
        if (err.response?.status === 404) {
          setError('Dorm not found');
        } else {
          setError('Error loading dorm');
        }
      });
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // clear on submit

    try {
      if (isEdit) {
        await axios.put(`/api/dorms/${id}`, form);
      } else {
        await axios.post('/api/dorms', form);
      }
      navigate('/dorm-explorer');
    } catch (err) {
      console.error('Error saving dorm:', err);
      setError(err.response?.data?.error || 'Submit failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Edit Dorm' : 'Add New Dorm'}</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows={4}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image URL</label>
          <input
            id="img"
            name="img"
            type="text"
            value={form.img}
            onChange={handleChange}
            className="form-control"
            placeholder="/images/dorm.jpg"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Save Changes' : 'Create Dorm'}
        </button>
      </form>
    </div>
  );
}
