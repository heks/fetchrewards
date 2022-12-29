import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {SubmitButton, Label, Input, Select, Dialog } from '../components';

const FETCHREWARDS_URL = 'https://frontend-take-home.fetchrewards.com/form';

const initialOptions = { occupations: [], state: [] };
const initialAccount = {name: '', email: '', password: '', occupation: '', state: ''};

const SignUpForm = () => {
  const [account, setAccount] = useState(initialAccount);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitSuccessful } } = useForm();
  const onSubmit = async (data) => {
    const { cPassword, ...restProps } = data;
    try {
      const response = await axios.post(FETCHREWARDS_URL, restProps);
      const { data } = response;
      reset();
      setAccount(data);
      setIsOpen(true);
    } catch (error) {
      alert("There is an error");
    }
  };
  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await axios.get(FETCHREWARDS_URL);
        const { data } = response;
        setOptions(data);
      } catch (error) {
        alert("There is an error fetching options");
      }
    };
    getOptions();
  }, []);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const { states, occupations } = options;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="name">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                autoComplete="given-name"
                register={register}
                name="name"
                errors={errors.name}
                validation={{
                  required: "'Name' is required",
                  maxLength: {
                    value: 20,
                    message: 'Please ensure your name is less than 20 characters'
                  }
                }}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="email">
                Email address
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="john@example.com"
                autoComplete="email"
                errors={errors.email}
                register={register}
                validation={{
                  required: "'Email' is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email address"
                  }
                }}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="eg, •••••••"
                errors={errors.password}
                id="password"
                register={register}
                validation={{
                  required: "'Password' is required",
                  minLength: 'Password length should be at least 4 characters',
                }}
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <Label htmlFor="confirm-password">
                Confirm Password
              </Label>
              <Input
                type="password"
                errors={errors.cPassword}
                name="cPassword"
                placeholder="eg, •••••••"
                id="cPassword"
                register={register}
                validation={{
                  required: "'Confirm Password' is required",
                  validate: value => {
                    if (watch('password') !== value) {
                      return "Your passwords do no match";
                    }
                  }
                }}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Label htmlFor="occupation">
                Occupation
              </Label>
              <Select
                id="occupation"
                name="occupation"
                errors={errors.occupation}
                register={register}
                options={occupations}
                validation={{
                  required: "'Occupation' is a required field"
                }}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <Label htmlFor="region">
                State / Province
              </Label>
              <Select
                id="state"
                name="state"
                errors={errors.state}
                register={register}
                options={states}
                validation={{
                  required: "'State / Province' is a required field"
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
          <SubmitButton type="submit">
            Create Account
          </SubmitButton>
        </div>
      </div>
      <Dialog open={isOpen} setIsOpen={setIsOpen} account={account} />
    </form>
  );
};

export default SignUpForm;
