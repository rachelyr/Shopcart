import React from 'react';
import { RadioGroup, Label, Radio } from '@headlessui/react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked} from 'react-icons/md';
import {FilterData} from '../Data/FilterData';
import { useState } from 'react';


export default function Filter ({button, states, functions, categories, tags}){
    const [activePublish, setActivePublish] = useState(states?.published || null);
    const [activeTag, setActiveTag] = useState(states?.tag || null);
    const [activeCategory, setActiveCategory] = useState(states?.category || null);

    //extract tags
    const tagsData = tags?.map((t) => ({
        title: t?._id,
        value: t?._id,
    }));

    //extract categories
    const catData = categories?.map((c) => ({
        title: c?.name,
        value: c?._id,
    }));

    const datas= [
        {
            select: states?.published,
            setSelect: states?.setPublished,
            name: 'Published',
            data: FilterData.Published,
            active: activePublish,
        },
        {
            select: states?.tag,
            setSelect: states?.setTag,
            name: 'Popular Tags',
            data: tagsData,
            active: activeTag,
        },
        {
            select: states?.category,
            setSelect: states?.setCategory,
            name: 'Categories',
            data: catData,
            active: activeCategory,
        },
    ];

    //active
    const active = (name) =>{
        if (name === 'Published'){
            return activePublish;
        } else if (name === 'Popular Tags'){
            return activeTag;
        } else if (name === 'Categories'){
            return activeCategory;
        }
    };

  return (
    <div className="flex flex-col gap-8">
      {datas.map((data) => (
        <div key={data?.name} className="border-b border-deepest pb-8">
          <h3 className="text-md font-medium mb-6 capitalize">{data?.name}</h3>
          <RadioGroup
            value={data.select}
            onChange={data.setSelect}
          >
            <div className="space-y-6">
              {data.data?.map((item) => (
                <Radio
                  key={item?.title}
                  value={item}
                  onClick={() => {
                    data.setSelect(item);
                    if(data?.name === 'Published'){
                      setActivePublish(item?.title);
                    } else if(data?.name === 'Popular Tags'){
                      setActiveTag(item?.title);
                    } else if(data?.name === 'Categories'){
                      setActiveCategory(item?.title);
                    }
                  }}
                  className="flex items-center gap-3 pb-1 w-full cursor-pointer"
                >
                  {active(data?.name) === item?.title ? (
                    <MdRadioButtonChecked className="text-main text-lg" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-gray-500 text-lg" />
                  )}
                  <Label
                    as="p"
                    className={`text-sm capitalize ${
                      active(data?.name) === item?.title
                        ? 'text-main'
                        : 'text-gray-500'
                    }`}
                  >
                    {item?.title}
                  </Label>
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>
      ))}

      {button ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => functions?.SidebarFilter()}
            className="text-sm md-2 text-white bg-main w-full rounded py-3"
          >
            Apply Filter
          </button>
          <button
            onClick={() =>
              functions?.clearFilters({
                setActivePublish,
                setActiveTag,
                setActiveCategory,
              })
            }
            className="text-sm md-2 text-white bg-main w-full rounded py-3"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            functions?.clearFilters({
              setActivePublish,
              setActiveTag,
              setActiveCategory,
            })
          }
          className="text-sm md-2 text-white bg-main w-full rounded py-3"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

