import React, { useState, useEffect } from 'react';
import { submitAdoptionForm, getPets } from '../api';
import './AdoptionForm.css';

const AdoptionForm = ({ petId, onSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: localStorage.getItem('user_id') || '',
    pet_id: petId || '',
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    age_category: '',
    address: '',
    address_line2: '',
    city: '',
    province: '',
    postal_code: '',
    interested_pet: '',
    living_environment: '',
    duration_at_address: '',
    residents: '',
    home_description: '',
    allergies: '',
    partner_agreement: '',
    alone_time: '',
    other_pets: '',
    spayed_neutered: '',
    current_pets_vaccinated: '',
    dog_stay: '',
    enrichment: '',
    had_dogs_before: '',
    training_methods: '',
    has_veterinarian: '',
    vet_frequency: '',
    willing_to_work_on: '',
    reference: '',
    additional_info: '',
    consent: false,
  });
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        const availablePets = response.data.filter(
          (pet) => pet.adoption_status.toLowerCase() === 'available'
        );
        setPets(availablePets);

        if (petId) {
          const selectedPet = response.data.find((pet) => pet.id === parseInt(petId));
          if (selectedPet) {
            setFormData((prev) => ({
              ...prev,
              pet_id: petId,
              interested_pet: selectedPet.name,
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching pets:', err);
        setError('Failed to load pets. Please try again later.');
      }
    };
    fetchPets();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    // Validate user_id
    if (!formData.user_id) {
      setError('Please log in to submit the form.');
      window.location.href = '/auth';
      return;
    }

    // Validate pet_id
    if (!formData.pet_id) {
      setError('Please select a pet to adopt.');
      return;
    }

    // Validate required fields
    const requiredFields = [
      'first_name', 'last_name', 'phone_number', 'email', 'age_category',
      'address', 'city', 'province', 'postal_code', 'interested_pet',
      'living_environment', 'duration_at_address', 'residents',
      'home_description', 'allergies', 'alone_time', 'spayed_neutered',
      'current_pets_vaccinated', 'dog_stay', 'enrichment', 'had_dogs_before',
      'training_methods', 'has_veterinarian', 'vet_frequency',
      'willing_to_work_on', 'reference', 'consent'
    ];
    for (const field of requiredFields) {
      if (field !== 'consent' && (!formData[field] || formData[field].trim() === '')) {
        setError(`Please fill in the ${field.replace('_', ' ')} field.`);
        return;
      }
    }
    if (!formData.consent) {
      setError('You must consent to the terms to submit the form.');
      return;
    }

    // Normalize consent to a string
    const normalizedFormData = {
      ...formData,
      consent: formData.consent.toString(),
    };

    // Log the form data
    console.log('Form Data Sent:', normalizedFormData);

    try {
      const response = await submitAdoptionForm(normalizedFormData);
      console.log('Response:', response.data);
      alert('Your application has been submitted successfully!');
      setFormData({
        user_id: localStorage.getItem('user_id') || '',
        pet_id: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        age_category: '',
        address: '',
        address_line2: '',
        city: '',
        province: '',
        postal_code: '',
        interested_pet: '',
        living_environment: '',
        duration_at_address: '',
        residents: '',
        home_description: '',
        allergies: '',
        partner_agreement: '',
        alone_time: '',
        other_pets: '',
        spayed_neutered: '',
        current_pets_vaccinated: '',
        dog_stay: '',
        enrichment: '',
        had_dogs_before: '',
        training_methods: '',
        has_veterinarian: '',
        vet_frequency: '',
        willing_to_work_on: '',
        reference: '',
        additional_info: '',
        consent: false,
      });
      setError(null);
      if (onSubmit) {
        onSubmit();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Error submitting form:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(`There was an error submitting your application: ${errorMessage}. Please try again.`);
    }
  };

  return (
    <div className="adoption-form">
      <h1>Adoption Form</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Select a pet to adopt:</label>
            <select name="pet_id" value={formData.pet_id} onChange={handleChange} required disabled={!!petId}>
              <option value="">Select a pet</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Please select the appropriate age category:</label>
          <select name="age_category" value={formData.age_category} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="under18">Under 18</option>
            <option value="18plus">18+</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Street Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address Line 2:</label>
            <input type="text" name="address_line2" value={formData.address_line2} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Province:</label>
            <input type="text" name="province" value={formData.province} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Postal Code:</label>
            <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Which pet are you interested in? (e.g., name or type)</label>
            <input type="text" name="interested_pet" value={formData.interested_pet} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>What best describes your living environment?</label>
            <input type="text" name="living_environment" value={formData.living_environment} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>How long have you lived there?</label>
            <input type="text" name="duration_at_address" value={formData.duration_at_address} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Who lives at this address? (include age for children):</label>
            <input type="text" name="residents" value={formData.residents} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Describe your home and lifestyle:</label>
            <textarea name="home_description" value={formData.home_description} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Is anyone in your home allergic to dogs?</label>
            <select name="allergies" value={formData.allergies} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Does your partner agree with adopting this animal?</label>
            <select name="partner_agreement" value={formData.partner_agreement} onChange={handleChange}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="notAsked">I haven't asked yet</option>
              <option value="notApplicable">Not applicable</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>How many hours will the pet be alone (dogs only)?</label>
            <input type="text" name="alone_time" value={formData.alone_time} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Do you have other pets? If yes, describe:</label>
            <textarea name="other_pets" value={formData.other_pets} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Are your current pets spayed/neutered?</label>
            <select name="spayed_neutered" value={formData.spayed_neutered} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Are your current pets vaccinated?</label>
            <select name="current_pets_vaccinated" value={formData.current_pets_vaccinated} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Where will your dog stay when you’re not home?</label>
            <input type="text" name="dog_stay" value={formData.dog_stay} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>What enrichment will you offer your dog?</label>
            <textarea name="enrichment" value={formData.enrichment} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Have you had dogs before?</label>
            <select name="had_dogs_before" value={formData.had_dogs_before} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>What training methods will you use?</label>
            <textarea name="training_methods" value={formData.training_methods} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Do you have a veterinarian?</label>
            <select name="has_veterinarian" value={formData.has_veterinarian} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>How often should your dog see a vet?</label>
            <select name="vet_frequency" value={formData.vet_frequency} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="whenSick">When sick</option>
              <option value="every3Years">Every 3 years</option>
              <option value="twicePerYear">Twice per year</option>
              <option value="annually">Annually</option>
              <option value="onceAMonth">Once a month</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>What are you willing to work on with your dog?</label>
            <textarea name="willing_to_work_on" value={formData.willing_to_work_on} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Provide at least one reference (with contact):</label>
            <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Anything else we should know?</label>
            <textarea name="additional_info" value={formData.additional_info} onChange={handleChange} />
          </div>
        </div>

        <div className="info-section">
          <label>
            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
            I understand the adoption process and consent to the terms (see details above).
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdoptionForm;