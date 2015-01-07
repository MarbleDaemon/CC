Function subdivide_path(path:TList,size=0)
	
	Local res:TList=CreateList()
	
	Local prev:waypoint
	For w:waypoint=EachIn path
		If prev<>Null
			ListAddLast res,create_free_waypoint((prev.x+w.x)/(2),(prev.y+w.y)/(2))
		End If
		
		ListAddLast res,w
		prev=w
	Next
	
	ClearList path
	For w:waypoint=EachIn res
		ListAddLast path,w
	Next
		
End Function

Function path_visibility(path:TList)

	Local arr:waypoint[]=waypoint[](ListToArray(path))
	Local prev_prev:waypoint
	Local prev:waypoint
	Local cur:waypoint
	Local nxt:waypoint
	Local last:waypoint
	
	ClearList path

	prev=arr[0]
	cur=arr[arr.length-1]
	If aabb.point_see_point(cur.x,cur.y,prev.x,prev.y)
		ListAddLast path,prev
		ListAddLast path,cur
		Return
	End If
	
	cur=arr[0]
	ListAddLast path,cur
	
	last=arr[arr.length-1]
	Local nxt_cnt=0
	Local prev_cnt=0
	
	Local t=0
	
	While cur<>Null
		t=t+1
		If t>10000 Exit
		nxt_cnt:+1
		nxt=arr[nxt_cnt]
		
		If aabb.point_see_point(cur.x,cur.y,nxt.x,nxt.y)
			prev=nxt
			prev_cnt=nxt_cnt
		Else
			ListAddLast path,prev
			cur=prev
			nxt_cnt=prev_cnt
		End If
		
		If nxt=last Exit
	Wend
	
	
	ListAddLast path,last

End Function



Function find_path:TList(fx#,fy#,tx#,ty#)
	
	Local path:TList=CreateList()

	Global real_start:waypoint=create_free_waypoint(fx,fy)
	Global real_end:waypoint=create_free_waypoint(tx,ty)

	real_start.x=fx
	real_start.y=fy
	real_end.x=tx
	real_end.y=ty
		
	If Not aabb.can_put_point(fx,fy) 
		ListAddFirst path,real_start
		ListAddLast path,real_end
		Return path
	End If
	If Not aabb.can_put_point(tx,ty) 
		ListAddFirst path,real_start
		ListAddLast path,real_end
		Return path
	End If
		

	path=waypoint.find_path(waypoint.get_nearest(real_start.x,real_start.y),waypoint.get_nearest(real_end.x,real_end.y))
	ListAddFirst path,real_start
	ListAddLast path,real_end	
		
	subdivide_path(path)
	subdivide_path(path)
	subdivide_path(path)
	subdivide_path(path)

	path_visibility(path)
	path_visibility(path)
			
	Return path
		
End Function
























