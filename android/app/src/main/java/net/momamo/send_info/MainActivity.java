package net.momamo.send_info;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    DataPost dataPost=null;
    Map<String,Object> childUpdates=new HashMap<>();
    Map<String,Object>valuesPost=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final DatabaseReference myData = FirebaseDatabase.getInstance().getReference("general_info");
        ValueEventListener listener1 = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Log.e("getFirebaseDatabase", "key: " + dataSnapshot.getChildrenCount());
            }
            @Override
            public void onCancelled(DatabaseError error) {
                Log.e("my tag", "server error", error.toException());
            }
        };
        myData.addValueEventListener(listener1);

        Button button = (Button)findViewById(R.id.button_send);

        View.OnClickListener listener2 = new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Spinner spinner1 = (Spinner)findViewById(R.id.spinner_area);
                String area = spinner1.getSelectedItem().toString();
                Spinner spinner2 = (Spinner)findViewById(R.id.spinner_sido);
                String sido = spinner2.getSelectedItem().toString();
                EditText editText1 = (EditText)findViewById(R.id.editText_title);
                String title = editText1.getText().toString();
                EditText editText2 = (EditText)findViewById(R.id.editText_content);
                String content = editText2.getText().toString();

                dataPost = new DataPost(area, sido, title, content);
                valuesPost = dataPost.toMap();

                childUpdates.put("/general_info", valuesPost);
                myData.updateChildren(childUpdates);

                AlertDialog.Builder builder=new AlertDialog.Builder(MainActivity.this);
                builder.setMessage(R.string.sendSuccess);
                builder.setNeutralButton(R.string.close,null);
                AlertDialog dialog=builder.create();
                dialog.show();

            }
        };
        button.setOnClickListener(listener2);
    }

}
