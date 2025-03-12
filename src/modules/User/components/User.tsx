import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";

import { TextInput, Button } from "@mantine/core";

import { selectUsers, editUser } from "../redux";

import type { Dispatch } from "redux";
import type { UserActionTypes } from "../redux";
import type { User } from "../types/User";

const MainContent = styled("div")`
  margin: 50px;
`;

const StyledTextInput = styled(TextInput)`
  margin-top: 20px;
`;

export function User() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const users = useSelector(selectUsers);
  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    return <>User not found!</>;
  }
  const dispatch = useDispatch<Dispatch<UserActionTypes>>();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city,
      zipcode: user.address.zipcode,
      lat: user.address.geo.lat,
      lng: user.address.geo.lng,
      companyName: user.company.name,
      catchPhrase: user.company.catchPhrase,
      bs: user.company.bs,
    },
    onSubmit: (values) => {
      const updatedUser: User = {
        ...user,
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        website: values.website,
        address: {
          street: values.street,
          suite: values.suite,
          city: values.city,
          zipcode: values.zipcode,
          geo: { lat: values.lat, lng: values.lng },
        },
        company: {
          name: values.companyName,
          catchPhrase: values.catchPhrase,
          bs: values.bs,
        },
      };
      dispatch(editUser(updatedUser));
      alert(`User ${user.id} has been updated`);
      navigate(`/users`);
    },
  });

  return (
    <MainContent>
      <form onSubmit={formik.handleSubmit}>
        <StyledTextInput
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          label="Name"
        />
        <StyledTextInput
          value={formik.values.username}
          onChange={formik.handleChange}
          name="username"
          label="Username"
        />
        <StyledTextInput
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          label="Email"
        />
        <StyledTextInput
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          label="Phone"
        />
        <StyledTextInput
          value={formik.values.website}
          onChange={formik.handleChange}
          name="website"
          label="Website"
        />

        <div className="grid grid-cols-2 gap-2">
          <StyledTextInput
            value={formik.values.street}
            onChange={formik.handleChange}
            name="street"
            label="Street"
          />
          <StyledTextInput
            value={formik.values.suite}
            onChange={formik.handleChange}
            name="suite"
            label="Suite"
          />
          <StyledTextInput
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            label="City"
          />
          <StyledTextInput
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            name="zipcode"
            label="Zipcode"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <StyledTextInput
            value={formik.values.lat}
            onChange={formik.handleChange}
            name="lat"
            label="Latitude"
          />
          <StyledTextInput
            value={formik.values.lng}
            onChange={formik.handleChange}
            name="lng"
            label="Longitude"
          />
        </div>

        <StyledTextInput
          value={formik.values.companyName}
          onChange={formik.handleChange}
          name="companyName"
          label="Company Name"
        />
        <StyledTextInput
          value={formik.values.catchPhrase}
          onChange={formik.handleChange}
          name="catchPhrase"
          label="Catchphrase"
        />
        <StyledTextInput
          value={formik.values.bs}
          onChange={formik.handleChange}
          name="bs"
          label="Business"
        />

        <Button type="submit" fullWidth mt="md">
          Save
        </Button>
      </form>
    </MainContent>
  );
}
