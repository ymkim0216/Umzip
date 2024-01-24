package com.ssafy.umzip.domain.tag.service;

import com.ssafy.umzip.domain.tag.dto.TagListByLargeCodeResponce;
import com.ssafy.umzip.domain.tag.entity.Tag;
import com.ssafy.umzip.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;


    @Override
    public List<TagListByLargeCodeResponce> receiveTagType(long largeCode) {
        List<TagListByLargeCodeResponce> tagListByLargeCode = new ArrayList<>();
        Optional<List<Tag>> optionalTagList = tagRepository.findAllByCodeLargeId(largeCode);

        if (optionalTagList.isPresent()) {
            List<Tag> tagList = optionalTagList.get();
            List<TagListByLargeCodeResponce> tagDTOList = new ArrayList<>();

            for (Tag tag : tagList) {
                tagDTOList.add(convertToDTO(tag));
            }

//            System.out.print(">>>>>> ");
//            System.out.println(tagDTOList);

            return tagDTOList;
        } else {
//            System.out.println("Optional is empty.");
            return Collections.emptyList();
        }
    }
    private TagListByLargeCodeResponce convertToDTO(Tag tag) {
        TagListByLargeCodeResponce dto = new TagListByLargeCodeResponce();
        dto.setTagId(tag.getTagId());
        dto.setTagId(tag.getCodeLargeId());
        dto.setTagName(tag.getTagName());
        return dto;
    }


}
