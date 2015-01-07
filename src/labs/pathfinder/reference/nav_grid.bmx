Framework brl.basic

Import brl.Graphics
Import BRL.D3D7Max2D
Import brl.max2d
Import BRL.LinkedList
Import BRL.PolledInput

Include "math.bmx"
Include "path.bmx"
Include "aabb.bmx"
Include "waypoint.bmx"

AppTitle="solid AABB pathfinding"

Graphics 800,600

Print "generating walls AABBs..."
For i=1 To 100
	create_aabb(Rnd(100,700),Rnd(100,500),Rnd(10,50),Rnd(10,50),aabb.walls)
Next

Print "creating waypoints..."
' setting waypoint at each AABB corner, here is possible to add more waypoints in other places
For ab:aabb=EachIn aabb.walls
	create_waypoint(ab.x-2,ab.y-2)
	create_waypoint(ab.a+2,ab.y-2)
	create_waypoint(ab.a+2,ab.b+2)
	create_waypoint(ab.x-2,ab.b+2)
Next

Print "linking waypoints..."
' this maked connections is one waypoint see all another
waypoint.build_links

Print "done"

start_x#=50
start_y#=600-50
end_x#=800-50
end_y#=50

' find path from one point to another is realy easy now
path:TList=find_path(start_x,start_y,end_x,end_y)
' path now store waypoints from first to last (include start and end)

While Not (KeyHit(27) Or AppTerminate())
	
	' rebuild path on mouse down
	If MouseDown(1)
		start_x=MouseX()
		start_y=MouseY()
		path:TList=find_path(start_x,start_y,end_x,end_y)
	End If
	If MouseDown(2)
		end_x=MouseX()
		end_y=MouseY()
		path:TList=find_path(start_x,start_y,end_x,end_y)
	End If
	
	Cls
	
	' draw walls
	aabb.draw_aabbs()
	
	If KeyDown(key_f1)
		waypoint.draw_waypoints()
	End If
	
	' draw path
	SetColor 255,255,200
	Local prev:waypoint=Null
	For wp:waypoint=EachIn path
		If prev<>Null
			DrawLine prev.x,prev.y,wp.x,wp.y
			DrawRect wp.x-2,wp.y-2,4,4
		End If
		prev=wp
	Next
	
	' draw start\end points
	SetColor 255,255,255
	DrawRect start_x-5,start_y-5,10,10
	DrawRect end_x-5,end_y-5,10,10
	
	DrawText "start (LMB)",start_x,start_y+5
	DrawText "end (RMB)",end_x,end_y+5
	
	Flip
	
Wend












