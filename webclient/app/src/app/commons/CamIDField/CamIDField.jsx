import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ValidatedTextField from '../validatedTextField/ValidatedTextField';
import { Stack } from '@mui/material';
import {useTranslation} from "react-i18next";

function CamIDField() {
  const {t} = useTranslation();
  const [inputs, setInputs] = useState(['']);

  const handleAddTextField = () => {
    setInputs([...inputs, '']);
  };

  const handleRemoveTextField = (index) => {
    if (index !== 0) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <>
      {inputs.map((input, index) => (
        <Stack key={index} direction={'row'} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <ValidatedTextField
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            label={`CamID ${index + 1}`}
            variant="standard"
            fullWidth
            required={index === 0}
          />
          {index !== 0 && (
            <IconButton onClick={() => handleRemoveTextField(index)} aria-label={t("button.delete")}>
              <RemoveIcon />
            </IconButton>
          )}
          {index === inputs.length - 1 && (
            <IconButton onClick={handleAddTextField} aria-label={t("button.create")}>
              <AddIcon />
            </IconButton>
          )}
        </Stack>
      ))}
    </>
  );
}

export default CamIDField;