"use client"

import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {

    const [inputvalue, setInputvalue] = useState("");

    const addValue = (item: string) => {
      onChange(item);
      setInputvalue("");
    };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputvalue}
        onChange={(e) => setInputvalue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputvalue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText