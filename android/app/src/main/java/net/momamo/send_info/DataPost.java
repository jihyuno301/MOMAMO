package net.momamo.send_info;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import java.util.HashMap;
import java.util.Map;

@IgnoreExtraProperties
public class DataPost {
    public String area;
    public String sido;
    public String title;
    public String content;

    public DataPost() {
        // Default constructor required for calls to DataSnapshot.getValue(FirebasePost.class)
    }

    public DataPost(String area, String sido, String title, String content) {
        this.area = area;
        this.sido = sido;
        this.title = title;
        this.content = content;
    }

    @Exclude
    public Map<String, Object> toMap() {
        HashMap<String, Object> rst = new HashMap<>();
        rst.put("area", area);
        rst.put("sido", sido);
        rst.put("title", title);
        rst.put("content", content);
        return rst;
    }
}
