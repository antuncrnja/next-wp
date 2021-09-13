import { useState } from 'react';

export default function SendMail(){

	const [name, setName] = useState('');
	const [mail, setMail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [mailMessage, setMailMessage] = useState('');
	const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = e => {
		e.preventDefault();
		setMailMessage('Sending...')

		let formData = new FormData();
		formData.append('your-name', name);
		formData.append('your-email', mail);
		formData.append('your-subject', subject);
		formData.append('your-message', message);
		checkbox && formData.append('checkbox-343', checkbox);


		fetch('https://antuncrnja.com/w/wp-json/contact-form-7/v1/contact-forms/142/feedback', {
			method: 'POST',
			body: formData,
			})
			.then(response => response.json())
			.then(mailData => {
				console.error(mailData)
				setMailMessage(mailData.message);
				setTimeout( ()=> {
					setMailMessage('')
				}, 4000)
			})
			.catch(error => {
				setMailMessage(error.message);
				setTimeout( ()=> {
					setMailMessage('')
				}, 4000)
			});
	}
	return(
		<div className="form">

		<form onSubmit={handleSubmit}>

			<h1>Contact us</h1>

			<input type="text" placeholder="Name" value={name} onChange={ e => setName(e.target.value) }/>
		
			<input type="text" placeholder="Email" value={mail} onChange={ e => setMail(e.target.value) } />
		
			<input type="text" placeholder="Subject" value={subject} onChange={ e => setSubject(e.target.value) }/>
		
			<textarea rows="4" placeholder="Message" value={message} onChange={ e => setMessage(e.target.value) }/>

<label>
			<input type="checkbox" value={checkbox} onChange={ e => setCheckbox(!checkbox) }/>Please bla bls bla bls
</label><br />

			<small style={{color: 'red'}}>{mailMessage}</small>

			<input type="submit" value="Send Mail" />
			
			
		</form>
		</div>
	)
}